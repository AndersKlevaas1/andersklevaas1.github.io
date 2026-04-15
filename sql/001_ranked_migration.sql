-- ============================================================
-- Ranked Code Island — migration 001
-- Schema cleanup, RLS lockdown, SECURITY DEFINER functions
-- ============================================================
-- Kjør HELE denne filen i Supabase SQL Editor.
-- Den er idempotent så langt det er praktisk mulig — du kan
-- kjøre den på nytt hvis noe går galt underveis.

BEGIN;

-- ------------------------------------------------------------
-- 1.1  Fjern testdata, gjenopprett FK til auth.users
-- ------------------------------------------------------------
DELETE FROM match_history WHERE player_id IN (
  SELECT id FROM profiles WHERE username IN ('TestPlayer1','TestPlayer2','TestPlayer3')
);
DELETE FROM matchmaking_queue WHERE player_id IN (
  SELECT id FROM profiles WHERE username IN ('TestPlayer1','TestPlayer2','TestPlayer3')
);
DELETE FROM match_state WHERE match_id IN (
  SELECT id FROM matches WHERE player_a_id IN (
    SELECT id FROM profiles WHERE username IN ('TestPlayer1','TestPlayer2','TestPlayer3')
  ) OR player_b_id IN (
    SELECT id FROM profiles WHERE username IN ('TestPlayer1','TestPlayer2','TestPlayer3')
  )
);
DELETE FROM matches WHERE player_a_id IN (
  SELECT id FROM profiles WHERE username IN ('TestPlayer1','TestPlayer2','TestPlayer3')
) OR player_b_id IN (
  SELECT id FROM profiles WHERE username IN ('TestPlayer1','TestPlayer2','TestPlayer3')
);
DELETE FROM profiles WHERE username IN ('TestPlayer1','TestPlayer2','TestPlayer3');

ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;
ALTER TABLE profiles
  ADD CONSTRAINT profiles_id_fkey
  FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- ------------------------------------------------------------
-- 1.2  Lock down profiles UPDATE — kun username kan endres
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own username" ON profiles;

CREATE POLICY "Users can update own username" ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND elo = (SELECT elo FROM profiles WHERE id = auth.uid())
    AND wins = (SELECT wins FROM profiles WHERE id = auth.uid())
    AND losses = (SELECT losses FROM profiles WHERE id = auth.uid())
    AND matches_played = (SELECT matches_played FROM profiles WHERE id = auth.uid())
  );

-- ------------------------------------------------------------
-- 1.3  Lock down matches / match_state UPDATE
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "Players can update their match" ON matches;
DROP POLICY IF EXISTS "Match players can update state" ON match_state;
-- SELECT-policies beholdes slik at spillerne kan se sin match.

-- ------------------------------------------------------------
-- 1.4  Skjul fasiten
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "Questions are public" ON questions;
REVOKE SELECT ON questions FROM anon, authenticated;
-- questions leses nå kun via get_question_for_match().

-- ------------------------------------------------------------
-- 1.5  TIMESTAMP → TIMESTAMPTZ
-- ------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_name='profiles' AND column_name='created_at'
               AND data_type='timestamp without time zone') THEN
    ALTER TABLE profiles
      ALTER COLUMN created_at TYPE TIMESTAMPTZ USING created_at AT TIME ZONE 'UTC',
      ALTER COLUMN updated_at TYPE TIMESTAMPTZ USING updated_at AT TIME ZONE 'UTC';
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_name='matches' AND column_name='created_at'
               AND data_type='timestamp without time zone') THEN
    ALTER TABLE matches
      ALTER COLUMN created_at TYPE TIMESTAMPTZ USING created_at AT TIME ZONE 'UTC',
      ALTER COLUMN finished_at TYPE TIMESTAMPTZ USING finished_at AT TIME ZONE 'UTC',
      ALTER COLUMN player_a_last_seen TYPE TIMESTAMPTZ USING player_a_last_seen AT TIME ZONE 'UTC',
      ALTER COLUMN player_b_last_seen TYPE TIMESTAMPTZ USING player_b_last_seen AT TIME ZONE 'UTC';
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_name='match_state' AND column_name='updated_at'
               AND data_type='timestamp without time zone') THEN
    ALTER TABLE match_state
      ALTER COLUMN updated_at TYPE TIMESTAMPTZ USING updated_at AT TIME ZONE 'UTC';
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_name='matchmaking_queue' AND column_name='joined_at'
               AND data_type='timestamp without time zone') THEN
    ALTER TABLE matchmaking_queue
      ALTER COLUMN joined_at TYPE TIMESTAMPTZ USING joined_at AT TIME ZONE 'UTC';
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_name='match_history' AND column_name='completed_at'
               AND data_type='timestamp without time zone') THEN
    ALTER TABLE match_history
      ALTER COLUMN completed_at TYPE TIMESTAMPTZ USING completed_at AT TIME ZONE 'UTC';
  END IF;
END $$;

-- ------------------------------------------------------------
-- 1.6  Nye kolonner for match-state (hvilke øyer er vunnet)
-- ------------------------------------------------------------
ALTER TABLE matches
  ADD COLUMN IF NOT EXISTS player_a_islands TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS player_b_islands TEXT[] DEFAULT '{}';

ALTER TABLE matchmaking_queue
  ADD COLUMN IF NOT EXISTS elo INT DEFAULT 1000;

-- ------------------------------------------------------------
-- 1.7  chance_cards-tabell
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS chance_cards (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  weight NUMERIC NOT NULL CHECK (weight > 0),
  is_sabotage BOOLEAN NOT NULL DEFAULT FALSE
);

ALTER TABLE chance_cards ENABLE ROW LEVEL SECURITY;
-- Ingen SELECT-policy: kun SECURITY DEFINER-funksjoner leser tabellen.
REVOKE ALL ON chance_cards FROM anon, authenticated;

-- ------------------------------------------------------------
-- 1.8  SECURITY DEFINER-funksjoner
-- ------------------------------------------------------------

-- handle_new_user: auto-opprett profile når en bruker registreres
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  base_username TEXT;
  final_username TEXT;
  suffix INT := 0;
BEGIN
  base_username := COALESCE(
    NEW.raw_user_meta_data->>'username',
    NEW.raw_user_meta_data->>'full_name',
    split_part(NEW.email, '@', 1),
    'player'
  );
  base_username := regexp_replace(base_username, '[^a-zA-Z0-9_]', '', 'g');
  IF length(base_username) < 3 THEN
    base_username := base_username || 'user';
  END IF;

  final_username := base_username;
  WHILE EXISTS (SELECT 1 FROM profiles WHERE username = final_username) LOOP
    suffix := suffix + 1;
    final_username := base_username || suffix::TEXT;
  END LOOP;

  INSERT INTO profiles (id, username, elo, matches_played, wins, losses)
  VALUES (NEW.id, final_username, 1000, 0, 0, 0)
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Backfill profiler for brukere som allerede finnes i auth.users
INSERT INTO profiles (id, username, elo, matches_played, wins, losses)
SELECT
  u.id,
  COALESCE(
    NULLIF(regexp_replace(COALESCE(u.raw_user_meta_data->>'username', u.raw_user_meta_data->>'full_name', split_part(u.email, '@', 1), 'player'), '[^a-zA-Z0-9_]', '', 'g'), ''),
    'player_' || left(replace(u.id::text, '-', ''), 8)
  ) AS username,
  1000,
  0,
  0,
  0
FROM auth.users u
LEFT JOIN profiles p ON p.id = u.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- cancel_matchmaking: spiller forlater køen
CREATE OR REPLACE FUNCTION cancel_matchmaking()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  DELETE FROM matchmaking_queue WHERE player_id = auth.uid();
END;
$$;

-- find_or_create_match: atomisk matchmaking
CREATE OR REPLACE FUNCTION find_or_create_match()
RETURNS TABLE(match_id UUID, status TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  me UUID := auth.uid();
  my_elo INT;
  opponent_id UUID;
  new_match_id UUID;
  existing_match UUID;
BEGIN
  IF me IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Allerede i en aktiv match?
  SELECT id INTO existing_match FROM matches
   WHERE (player_a_id = me OR player_b_id = me) AND status = 'active'
   LIMIT 1;
  IF existing_match IS NOT NULL THEN
    RETURN QUERY SELECT existing_match, 'resumed'::TEXT;
    RETURN;
  END IF;

  SELECT elo INTO my_elo FROM profiles WHERE id = me;
  IF my_elo IS NULL THEN
    RAISE EXCEPTION 'Profile not found';
  END IF;

  -- Finn motstander i ±150 ELO
  SELECT q.player_id INTO opponent_id
  FROM matchmaking_queue q
  WHERE q.player_id <> me
    AND q.queue_type = 'ranked'
    AND abs(q.elo - my_elo) <= 150
  ORDER BY q.joined_at ASC
  LIMIT 1
  FOR UPDATE SKIP LOCKED;

  IF opponent_id IS NULL THEN
    -- Ingen motstander — bli med i køen
    INSERT INTO matchmaking_queue (player_id, queue_type, elo)
    VALUES (me, 'ranked', my_elo)
    ON CONFLICT (player_id) DO UPDATE SET joined_at = NOW(), elo = my_elo;

    RETURN QUERY SELECT NULL::UUID, 'queued'::TEXT;
    RETURN;
  END IF;

  -- Opprett match
  INSERT INTO matches (
    player_a_id, player_b_id,
    player_a_badges, player_b_badges,
    player_a_islands, player_b_islands,
    current_turn, status,
    player_a_last_seen, player_b_last_seen
  )
  VALUES (
    opponent_id, me,
    0, 0,
    '{}', '{}',
    'player_a', 'active',
    NOW(), NOW()
  )
  RETURNING id INTO new_match_id;

  INSERT INTO match_state (match_id, answers_submitted, chance_cards_used)
  VALUES (new_match_id, '{"player_a": null, "player_b": null}'::jsonb, '[]'::jsonb);

  DELETE FROM matchmaking_queue WHERE player_id IN (me, opponent_id);

  RETURN QUERY SELECT new_match_id, 'matched'::TEXT;
END;
$$;

-- get_question_for_match: returnerer spørsmål UTEN correct
CREATE OR REPLACE FUNCTION get_question_for_match(
  p_match_id UUID,
  p_island TEXT,
  p_difficulty TEXT
)
RETURNS TABLE(question_id INT, question_text TEXT, options JSONB)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  me UUID := auth.uid();
  m RECORD;
  chosen_id INT;
BEGIN
  IF me IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT * INTO m FROM matches WHERE id = p_match_id;
  IF m IS NULL THEN
    RAISE EXCEPTION 'Match not found';
  END IF;
  IF m.player_a_id <> me AND m.player_b_id <> me THEN
    RAISE EXCEPTION 'Not a player in this match';
  END IF;
  IF m.status <> 'active' THEN
    RAISE EXCEPTION 'Match is not active';
  END IF;

  -- Sjekk at det er caller sin tur
  IF (m.current_turn = 'player_a' AND m.player_a_id <> me)
     OR (m.current_turn = 'player_b' AND m.player_b_id <> me) THEN
    RAISE EXCEPTION 'Not your turn';
  END IF;

  -- Velg et random spørsmål
  SELECT q.id INTO chosen_id
  FROM questions q
  WHERE q.island = p_island AND q.difficulty = p_difficulty
  ORDER BY random()
  LIMIT 1;

  IF chosen_id IS NULL THEN
    RAISE EXCEPTION 'No question found for island=% difficulty=%', p_island, p_difficulty;
  END IF;

  UPDATE match_state
     SET current_question_id = chosen_id,
         updated_at = NOW()
   WHERE match_id = p_match_id;

  RETURN QUERY
    SELECT q.id, q.question_text, q.options
    FROM questions q
    WHERE q.id = chosen_id;
END;
$$;

-- finish_match: intern helper (IKKE grant til authenticated)
CREATE OR REPLACE FUNCTION finish_match(p_match_id UUID, p_winner_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  m RECORD;
  winner_elo INT;
  loser_elo INT;
  winner_matches INT;
  loser_matches INT;
  winner_id UUID;
  loser_id UUID;
  expected_w NUMERIC;
  k_winner INT;
  k_loser INT;
  delta INT;
BEGIN
  SELECT * INTO m FROM matches WHERE id = p_match_id FOR UPDATE;
  IF m IS NULL OR m.status <> 'active' THEN
    RETURN;
  END IF;

  winner_id := p_winner_id;
  loser_id := CASE WHEN p_winner_id = m.player_a_id THEN m.player_b_id ELSE m.player_a_id END;

  SELECT elo, matches_played INTO winner_elo, winner_matches FROM profiles WHERE id = winner_id;
  SELECT elo, matches_played INTO loser_elo, loser_matches FROM profiles WHERE id = loser_id;

  expected_w := 1.0 / (1.0 + power(10.0, (loser_elo - winner_elo) / 400.0));
  k_winner := CASE WHEN winner_matches < 30 THEN 32 ELSE 16 END;
  k_loser := CASE WHEN loser_matches < 30 THEN 32 ELSE 16 END;

  delta := round(k_winner * (1 - expected_w));

  UPDATE profiles
     SET elo = elo + delta,
         wins = wins + 1,
         matches_played = matches_played + 1,
         updated_at = NOW()
   WHERE id = winner_id;

  UPDATE profiles
     SET elo = GREATEST(100, elo - round(k_loser * (1 - expected_w))::INT),
         losses = losses + 1,
         matches_played = matches_played + 1,
         updated_at = NOW()
   WHERE id = loser_id;

  UPDATE matches
     SET status = 'finished',
         winner_id = p_winner_id,
         finished_at = NOW()
   WHERE id = p_match_id;

  INSERT INTO match_history (match_id, player_id, opponent_id, won, elo_change)
  VALUES
    (p_match_id, winner_id, loser_id, TRUE, delta),
    (p_match_id, loser_id, winner_id, FALSE, -round(k_loser * (1 - expected_w))::INT);
END;
$$;

-- submit_answer: validerer svaret serverside
CREATE OR REPLACE FUNCTION submit_answer(
  p_match_id UUID,
  p_answer_index INT,
  p_island TEXT
)
RETURNS TABLE(correct BOOLEAN, my_badges INT, opponent_badges INT, finished BOOLEAN)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  me UUID := auth.uid();
  m RECORD;
  st RECORD;
  q RECORD;
  is_player_a BOOLEAN;
  is_correct BOOLEAN;
  my_new_badges INT;
  opp_badges INT;
  new_islands TEXT[];
  match_finished BOOLEAN := FALSE;
BEGIN
  IF me IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT * INTO m FROM matches WHERE id = p_match_id FOR UPDATE;
  IF m IS NULL THEN RAISE EXCEPTION 'Match not found'; END IF;
  IF m.status <> 'active' THEN RAISE EXCEPTION 'Match is not active'; END IF;

  is_player_a := (m.player_a_id = me);
  IF NOT is_player_a AND m.player_b_id <> me THEN
    RAISE EXCEPTION 'Not a player in this match';
  END IF;

  IF (m.current_turn = 'player_a' AND NOT is_player_a)
     OR (m.current_turn = 'player_b' AND is_player_a) THEN
    RAISE EXCEPTION 'Not your turn';
  END IF;

  SELECT * INTO st FROM match_state WHERE match_id = p_match_id FOR UPDATE;
  IF st.current_question_id IS NULL THEN
    RAISE EXCEPTION 'No active question';
  END IF;

  SELECT * INTO q FROM questions WHERE id = st.current_question_id;
  is_correct := (q.correct = p_answer_index);

  IF is_player_a THEN
    my_new_badges := m.player_a_badges;
    opp_badges := m.player_b_badges;
    new_islands := m.player_a_islands;
  ELSE
    my_new_badges := m.player_b_badges;
    opp_badges := m.player_a_badges;
    new_islands := m.player_b_islands;
  END IF;

  IF is_correct AND NOT (p_island = ANY(new_islands)) THEN
    my_new_badges := my_new_badges + 1;
    new_islands := array_append(new_islands, p_island);
  END IF;

  UPDATE matches
     SET player_a_badges = CASE WHEN is_player_a THEN my_new_badges ELSE m.player_a_badges END,
         player_b_badges = CASE WHEN is_player_a THEN m.player_b_badges ELSE my_new_badges END,
         player_a_islands = CASE WHEN is_player_a THEN new_islands ELSE m.player_a_islands END,
         player_b_islands = CASE WHEN is_player_a THEN m.player_b_islands ELSE new_islands END,
         current_turn = CASE WHEN m.current_turn = 'player_a' THEN 'player_b' ELSE 'player_a' END,
         player_a_last_seen = CASE WHEN is_player_a THEN NOW() ELSE m.player_a_last_seen END,
         player_b_last_seen = CASE WHEN NOT is_player_a THEN NOW() ELSE m.player_b_last_seen END
   WHERE id = p_match_id;

  UPDATE match_state
     SET current_question_id = NULL,
         updated_at = NOW()
   WHERE match_id = p_match_id;

  IF my_new_badges >= 6 THEN
    PERFORM finish_match(p_match_id, me);
    match_finished := TRUE;
  END IF;

  RETURN QUERY SELECT is_correct, my_new_badges, opp_badges, match_finished;
END;
$$;

-- draw_chance_card: weighted random fra chance_cards
CREATE OR REPLACE FUNCTION draw_chance_card(p_match_id UUID)
RETURNS TABLE(text TEXT, is_sabotage BOOLEAN)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  me UUID := auth.uid();
  m RECORD;
  total_weight NUMERIC;
  roll NUMERIC;
  acc NUMERIC := 0;
  c RECORD;
  chosen RECORD;
BEGIN
  IF me IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;

  SELECT * INTO m FROM matches WHERE id = p_match_id;
  IF m IS NULL THEN RAISE EXCEPTION 'Match not found'; END IF;
  IF m.status <> 'active' THEN RAISE EXCEPTION 'Match is not active'; END IF;
  IF m.player_a_id <> me AND m.player_b_id <> me THEN
    RAISE EXCEPTION 'Not a player in this match';
  END IF;
  IF (m.current_turn = 'player_a' AND m.player_a_id <> me)
     OR (m.current_turn = 'player_b' AND m.player_b_id <> me) THEN
    RAISE EXCEPTION 'Not your turn';
  END IF;

  SELECT SUM(weight) INTO total_weight FROM chance_cards;
  IF total_weight IS NULL OR total_weight = 0 THEN
    RAISE EXCEPTION 'No chance cards configured';
  END IF;

  roll := random() * total_weight;

  FOR c IN SELECT id, chance_cards.text, chance_cards.weight, chance_cards.is_sabotage
             FROM chance_cards ORDER BY id LOOP
    acc := acc + c.weight;
    IF roll <= acc THEN
      chosen := c;
      EXIT;
    END IF;
  END LOOP;

  UPDATE match_state
     SET chance_cards_used = COALESCE(chance_cards_used, '[]'::jsonb)
                              || jsonb_build_object('player', me::TEXT, 'card_id', chosen.id, 'at', NOW()),
         updated_at = NOW()
   WHERE match_id = p_match_id;

  RETURN QUERY SELECT chosen.text, chosen.is_sabotage;
END;
$$;

-- heartbeat: oppdater last_seen
CREATE OR REPLACE FUNCTION heartbeat(p_match_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  me UUID := auth.uid();
BEGIN
  IF me IS NULL THEN RETURN; END IF;
  UPDATE matches
     SET player_a_last_seen = CASE WHEN player_a_id = me THEN NOW() ELSE player_a_last_seen END,
         player_b_last_seen = CASE WHEN player_b_id = me THEN NOW() ELSE player_b_last_seen END
   WHERE id = p_match_id AND status = 'active';
END;
$$;

-- forfeit_stale_matches: kjøres av cron, fullfører matcher med død motstander
CREATE OR REPLACE FUNCTION forfeit_stale_matches()
RETURNS INT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  m RECORD;
  count INT := 0;
BEGIN
  FOR m IN SELECT * FROM matches WHERE status = 'active' LOOP
    IF m.player_a_last_seen < NOW() - INTERVAL '30 seconds'
       AND (m.player_b_last_seen IS NULL OR m.player_b_last_seen >= NOW() - INTERVAL '30 seconds') THEN
      PERFORM finish_match(m.id, m.player_b_id);
      count := count + 1;
    ELSIF m.player_b_last_seen < NOW() - INTERVAL '30 seconds'
       AND (m.player_a_last_seen IS NULL OR m.player_a_last_seen >= NOW() - INTERVAL '30 seconds') THEN
      PERFORM finish_match(m.id, m.player_a_id);
      count := count + 1;
    END IF;
  END LOOP;
  RETURN count;
END;
$$;

-- ------------------------------------------------------------
-- 1.9  GRANTS
-- ------------------------------------------------------------
REVOKE ALL ON FUNCTION find_or_create_match() FROM PUBLIC;
REVOKE ALL ON FUNCTION get_question_for_match(UUID, TEXT, TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION submit_answer(UUID, INT, TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION draw_chance_card(UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION heartbeat(UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION cancel_matchmaking() FROM PUBLIC;
REVOKE ALL ON FUNCTION finish_match(UUID, UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION forfeit_stale_matches() FROM PUBLIC;

GRANT EXECUTE ON FUNCTION find_or_create_match() TO authenticated;
GRANT EXECUTE ON FUNCTION get_question_for_match(UUID, TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION submit_answer(UUID, INT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION draw_chance_card(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION heartbeat(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION cancel_matchmaking() TO authenticated;
-- finish_match og forfeit_stale_matches gis IKKE til authenticated

-- ------------------------------------------------------------
-- 1.10  Realtime
-- ------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables
                  WHERE pubname='supabase_realtime' AND tablename='matches') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE matches;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables
                  WHERE pubname='supabase_realtime' AND tablename='match_state') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE match_state;
  END IF;
END $$;

COMMIT;

-- ============================================================
-- FERDIG. Neste: kjør 002_seed_chance_cards.sql og 003_seed_questions.sql
-- ============================================================
