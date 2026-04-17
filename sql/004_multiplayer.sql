-- ============================================================
-- Migration 004 — N-player support (opptil 8 spillere)
-- Erstatter 1v1-arkitektur med lobby-basert N-spiller system
-- Kjør i Supabase SQL Editor
-- ============================================================
BEGIN;

-- Rydd opp aktive/ventende matcher i dev-miljø
DELETE FROM match_history
  WHERE match_id IN (SELECT id FROM matches WHERE status != 'finished');
DELETE FROM match_state
  WHERE match_id IN (SELECT id FROM matches WHERE status != 'finished');
DELETE FROM matchmaking_queue;
DELETE FROM matches WHERE status != 'finished';

-- ------------------------------------------------------------
-- 1. Utvid matches-tabellen
-- ------------------------------------------------------------
ALTER TABLE matches
  ADD COLUMN IF NOT EXISTS player_ids        UUID[]  NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS current_turn_index INT     NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS player_badges     JSONB   NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS player_islands    JSONB   NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS player_last_seen  JSONB   NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS max_players       INT     NOT NULL DEFAULT 8,
  ADD COLUMN IF NOT EXISTS host_id           UUID    REFERENCES auth.users(id);

-- Drop alle RLS-policies som avhenger av de gamle kolonnene (må gjøres FØR DROP COLUMN)
DROP POLICY IF EXISTS "Players can view their matches"    ON matches;
DROP POLICY IF EXISTS "Players can update their match"    ON matches;
DROP POLICY IF EXISTS "Match players can view state"      ON match_state;
DROP POLICY IF EXISTS "Match players can update state"    ON match_state;
DROP POLICY IF EXISTS "Players can insert match state"    ON match_state;

-- Fjern gamle 1v1-kolonner (nå uten avhengige policies)
ALTER TABLE matches
  DROP COLUMN IF EXISTS player_a_id,
  DROP COLUMN IF EXISTS player_b_id,
  DROP COLUMN IF EXISTS player_a_badges,
  DROP COLUMN IF EXISTS player_b_badges,
  DROP COLUMN IF EXISTS player_a_islands,
  DROP COLUMN IF EXISTS player_b_islands,
  DROP COLUMN IF EXISTS player_a_last_seen,
  DROP COLUMN IF EXISTS player_b_last_seen,
  DROP COLUMN IF EXISTS current_turn;

-- Utvid status-constraint til å inkludere 'waiting'
ALTER TABLE matches DROP CONSTRAINT IF EXISTS matches_status_check;
ALTER TABLE matches ADD CONSTRAINT matches_status_check
  CHECK (status IN ('waiting', 'active', 'finished'));

-- Gjør opponent_id nullable i match_history (gir ikke mening for N>2)
ALTER TABLE match_history ALTER COLUMN opponent_id DROP NOT NULL;

-- ------------------------------------------------------------
-- 2. Nye RLS-policies (basert på player_ids-array)
-- ------------------------------------------------------------
CREATE POLICY "Players can view their matches" ON matches FOR SELECT
  USING (player_ids @> ARRAY[auth.uid()]);

-- match_state: spillere i matchen kan lese tilstanden
CREATE POLICY "Match players can view state" ON match_state FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM matches m
      WHERE m.id = match_state.match_id
        AND m.player_ids @> ARRAY[auth.uid()]
    )
  );

-- Drop funksjoner med endret returtype (CREATE OR REPLACE støtter ikke dette)
DROP FUNCTION IF EXISTS find_or_create_match();
DROP FUNCTION IF EXISTS submit_answer(UUID, INT, TEXT);

-- ------------------------------------------------------------
-- 3. find_or_create_match — opprett eller bli med i lobby
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION find_or_create_match()
RETURNS TABLE(match_id UUID, match_status TEXT, player_count INT)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  me      UUID := auth.uid();
  ex_id   UUID;
  open_id UUID;
  pcount  INT;
BEGIN
  IF me IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;
  IF NOT EXISTS (SELECT 1 FROM profiles WHERE id = me) THEN
    RAISE EXCEPTION 'Profile not found';
  END IF;

  -- Er allerede i en vente- eller aktiv match?
  SELECT id INTO ex_id FROM matches
  WHERE player_ids @> ARRAY[me] AND status IN ('waiting', 'active')
  LIMIT 1;

  IF ex_id IS NOT NULL THEN
    SELECT array_length(player_ids, 1) INTO pcount FROM matches WHERE id = ex_id;
    RETURN QUERY SELECT ex_id, (SELECT status FROM matches WHERE id = ex_id), pcount;
    RETURN;
  END IF;

  -- Finn åpen lobby med ledig plass
  SELECT id INTO open_id FROM matches
  WHERE status = 'waiting'
    AND COALESCE(array_length(player_ids, 1), 0) < max_players
  ORDER BY created_at ASC
  LIMIT 1
  FOR UPDATE SKIP LOCKED;

  IF open_id IS NOT NULL THEN
    UPDATE matches
    SET player_ids       = player_ids       || ARRAY[me],
        player_badges    = player_badges    || jsonb_build_object(me::TEXT, 0),
        player_islands   = player_islands   || jsonb_build_object(me::TEXT, '[]'::jsonb),
        player_last_seen = player_last_seen || jsonb_build_object(me::TEXT, NOW()::TEXT)
    WHERE id = open_id;

    SELECT array_length(player_ids, 1) INTO pcount FROM matches WHERE id = open_id;
    RETURN QUERY SELECT open_id, 'waiting'::TEXT, pcount;
    RETURN;
  END IF;

  -- Opprett ny lobby
  INSERT INTO matches (
    player_ids, current_turn_index,
    player_badges, player_islands, player_last_seen,
    host_id, max_players, status
  )
  VALUES (
    ARRAY[me], 1,
    jsonb_build_object(me::TEXT, 0),
    jsonb_build_object(me::TEXT, '[]'::jsonb),
    jsonb_build_object(me::TEXT, NOW()::TEXT),
    me, 8, 'waiting'
  )
  RETURNING id INTO open_id;

  INSERT INTO match_state (match_id, answers_submitted, chance_cards_used)
  VALUES (open_id, '{}'::jsonb, '[]'::jsonb);

  RETURN QUERY SELECT open_id, 'waiting'::TEXT, 1;
END;
$$;

-- ------------------------------------------------------------
-- 4. leave_lobby — forlat vente-lobby
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION leave_lobby()
RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  me             UUID := auth.uid();
  m              RECORD;
  new_player_ids UUID[];
BEGIN
  IF me IS NULL THEN RETURN; END IF;

  SELECT * INTO m FROM matches
  WHERE player_ids @> ARRAY[me] AND status = 'waiting'
  FOR UPDATE;

  IF m IS NULL THEN RETURN; END IF;

  SELECT array_agg(pid) INTO new_player_ids
  FROM unnest(m.player_ids) AS pid
  WHERE pid <> me;

  IF new_player_ids IS NULL OR array_length(new_player_ids, 1) = 0 THEN
    DELETE FROM match_state WHERE match_id = m.id;
    DELETE FROM matches      WHERE id      = m.id;
    RETURN;
  END IF;

  UPDATE matches
  SET player_ids       = new_player_ids,
      player_badges    = player_badges    - me::TEXT,
      player_islands   = player_islands   - me::TEXT,
      player_last_seen = player_last_seen - me::TEXT,
      host_id = CASE WHEN host_id = me THEN new_player_ids[1] ELSE host_id END
  WHERE id = m.id;
END;
$$;

-- ------------------------------------------------------------
-- 5. start_match — verten starter spillet
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION start_match(p_match_id UUID)
RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  me UUID := auth.uid();
  m  RECORD;
BEGIN
  SELECT * INTO m FROM matches WHERE id = p_match_id FOR UPDATE;
  IF m IS NULL                                          THEN RAISE EXCEPTION 'Match not found';         END IF;
  IF m.host_id <> me                                    THEN RAISE EXCEPTION 'Only the host can start'; END IF;
  IF m.status  <> 'waiting'                             THEN RAISE EXCEPTION 'Match already started';   END IF;
  IF COALESCE(array_length(m.player_ids, 1), 0) < 2    THEN RAISE EXCEPTION 'Need at least 2 players'; END IF;

  UPDATE matches SET status = 'active' WHERE id = p_match_id;
END;
$$;

-- ------------------------------------------------------------
-- 6. leave_active_match — forlat en pågående match
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION leave_active_match()
RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  me             UUID := auth.uid();
  m              RECORD;
  my_pos         INT;
  new_player_ids UUID[];
  new_turn_index INT;
BEGIN
  IF me IS NULL THEN RETURN; END IF;

  SELECT * INTO m FROM matches
  WHERE player_ids @> ARRAY[me] AND status = 'active'
  FOR UPDATE;

  IF m IS NULL THEN RETURN; END IF;

  -- Finn posisjonen min (1-basert)
  SELECT i INTO my_pos
  FROM generate_subscripts(m.player_ids, 1) i
  WHERE m.player_ids[i] = me;

  SELECT array_agg(pid ORDER BY ord) INTO new_player_ids
  FROM (
    SELECT pid, ROW_NUMBER() OVER () AS ord
    FROM unnest(m.player_ids) AS pid
    WHERE pid <> me
  ) t;

  -- Siste spiller igjen = vinner
  IF new_player_ids IS NULL OR array_length(new_player_ids, 1) = 0 THEN
    UPDATE matches SET status = 'finished', finished_at = NOW() WHERE id = m.id;
    RETURN;
  END IF;

  IF array_length(new_player_ids, 1) = 1 THEN
    PERFORM finish_match(m.id, new_player_ids[1]);
    RETURN;
  END IF;

  -- Juster tur-indeks
  IF my_pos < m.current_turn_index THEN
    new_turn_index := m.current_turn_index - 1;
  ELSIF my_pos = m.current_turn_index THEN
    new_turn_index := ((m.current_turn_index - 1) % array_length(new_player_ids, 1)) + 1;
  ELSE
    new_turn_index := m.current_turn_index;
  END IF;

  new_turn_index := GREATEST(1, LEAST(new_turn_index, array_length(new_player_ids, 1)));

  UPDATE matches
  SET player_ids         = new_player_ids,
      player_badges      = player_badges      - me::TEXT,
      player_islands     = player_islands     - me::TEXT,
      player_last_seen   = player_last_seen   - me::TEXT,
      current_turn_index = new_turn_index
  WHERE id = m.id;
END;
$$;

-- ------------------------------------------------------------
-- 7. get_question_for_match (oppdatert for N spillere)
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION get_question_for_match(
  p_match_id   UUID,
  p_island     TEXT,
  p_difficulty TEXT
)
RETURNS TABLE(question_id INT, question_text TEXT, options JSONB)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  me        UUID := auth.uid();
  m         RECORD;
  chosen_id INT;
BEGIN
  IF me IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;

  SELECT * INTO m FROM matches WHERE id = p_match_id;
  IF m IS NULL                            THEN RAISE EXCEPTION 'Match not found';             END IF;
  IF NOT (m.player_ids @> ARRAY[me])      THEN RAISE EXCEPTION 'Not a player in this match'; END IF;
  IF m.status <> 'active'                 THEN RAISE EXCEPTION 'Match is not active';         END IF;
  IF m.player_ids[m.current_turn_index] <> me THEN RAISE EXCEPTION 'Not your turn';          END IF;

  SELECT q.id INTO chosen_id FROM questions q
  WHERE q.island = p_island AND q.difficulty = p_difficulty
  ORDER BY random() LIMIT 1;

  IF chosen_id IS NULL THEN
    RAISE EXCEPTION 'No question found for island=% difficulty=%', p_island, p_difficulty;
  END IF;

  UPDATE match_state
  SET current_question_id = chosen_id, updated_at = NOW()
  WHERE match_id = p_match_id;

  RETURN QUERY SELECT q.id, q.question_text, q.options FROM questions q WHERE q.id = chosen_id;
END;
$$;

-- ------------------------------------------------------------
-- 8. submit_answer (oppdatert for N spillere, round-robin)
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION submit_answer(
  p_match_id    UUID,
  p_answer_index INT,
  p_island      TEXT
)
RETURNS TABLE(correct BOOLEAN, my_badges INT, finished BOOLEAN)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  me                 UUID := auth.uid();
  m                  RECORD;
  st                 RECORD;
  q                  RECORD;
  is_correct         BOOLEAN;
  my_new_badges      INT;
  my_new_islands     JSONB;
  island_already_won BOOLEAN;
  new_turn_index     INT;
  match_finished     BOOLEAN := FALSE;
BEGIN
  IF me IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;

  SELECT * INTO m FROM matches WHERE id = p_match_id FOR UPDATE;
  IF m IS NULL                            THEN RAISE EXCEPTION 'Match not found';             END IF;
  IF m.status <> 'active'                 THEN RAISE EXCEPTION 'Match is not active';         END IF;
  IF NOT (m.player_ids @> ARRAY[me])      THEN RAISE EXCEPTION 'Not a player in this match'; END IF;
  IF m.player_ids[m.current_turn_index] <> me THEN RAISE EXCEPTION 'Not your turn';          END IF;

  SELECT * INTO st FROM match_state WHERE match_id = p_match_id FOR UPDATE;
  IF st.current_question_id IS NULL THEN RAISE EXCEPTION 'No active question'; END IF;

  SELECT * INTO q FROM questions WHERE id = st.current_question_id;
  is_correct := (q.correct = p_answer_index);

  my_new_badges  := COALESCE((m.player_badges  ->> me::TEXT)::INT, 0);
  my_new_islands := COALESCE(m.player_islands   -> me::TEXT, '[]'::jsonb);

  IF is_correct THEN
    SELECT bool_or(val = p_island) INTO island_already_won
    FROM jsonb_array_elements_text(my_new_islands) AS val;

    IF NOT COALESCE(island_already_won, FALSE) THEN
      my_new_badges  := my_new_badges + 1;
      my_new_islands := my_new_islands || to_jsonb(p_island);
    END IF;
  END IF;

  -- Round-robin: neste spiller
  new_turn_index := (m.current_turn_index % array_length(m.player_ids, 1)) + 1;

  UPDATE matches
  SET player_badges      = player_badges    || jsonb_build_object(me::TEXT, my_new_badges),
      player_islands     = player_islands   || jsonb_build_object(me::TEXT, my_new_islands),
      player_last_seen   = player_last_seen || jsonb_build_object(me::TEXT, NOW()::TEXT),
      current_turn_index = new_turn_index
  WHERE id = p_match_id;

  UPDATE match_state
  SET current_question_id = NULL, updated_at = NOW()
  WHERE match_id = p_match_id;

  IF my_new_badges >= 6 THEN
    PERFORM finish_match(p_match_id, me);
    match_finished := TRUE;
  END IF;

  RETURN QUERY SELECT is_correct, my_new_badges, match_finished;
END;
$$;

-- ------------------------------------------------------------
-- 9. finish_match (oppdatert ELO for N spillere)
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION finish_match(p_match_id UUID, p_winner_id UUID)
RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  m              RECORD;
  winner_elo     INT;
  winner_matches INT;
  avg_loser_elo  NUMERIC;
  expected_w     NUMERIC;
  k_winner       INT;
  k_loser        INT;
  winner_delta   INT;
  loser_delta    INT;
  n_losers       INT;
  pid            UUID;
  pid_matches    INT;
BEGIN
  SELECT * INTO m FROM matches WHERE id = p_match_id FOR UPDATE;
  IF m IS NULL OR m.status <> 'active' THEN RETURN; END IF;

  UPDATE matches
  SET status = 'finished', winner_id = p_winner_id, finished_at = NOW()
  WHERE id = p_match_id;

  n_losers := COALESCE(array_length(m.player_ids, 1), 0) - 1;
  IF n_losers <= 0 THEN RETURN; END IF;

  SELECT elo, matches_played INTO winner_elo, winner_matches
  FROM profiles WHERE id = p_winner_id;

  SELECT AVG(p.elo) INTO avg_loser_elo
  FROM profiles p WHERE p.id = ANY(m.player_ids) AND p.id <> p_winner_id;

  expected_w   := 1.0 / (1.0 + power(10.0, (avg_loser_elo - winner_elo) / 400.0));
  k_winner     := CASE WHEN winner_matches < 30 THEN 32 ELSE 16 END;
  winner_delta := GREATEST(1, round(k_winner * (1 - expected_w))::INT);

  UPDATE profiles
  SET elo = elo + winner_delta, wins = wins + 1,
      matches_played = matches_played + 1, updated_at = NOW()
  WHERE id = p_winner_id;

  INSERT INTO match_history (match_id, player_id, opponent_id, won, elo_change)
  VALUES (p_match_id, p_winner_id, NULL, TRUE, winner_delta);

  FOREACH pid IN ARRAY m.player_ids LOOP
    IF pid <> p_winner_id THEN
      SELECT matches_played INTO pid_matches FROM profiles WHERE id = pid;
      k_loser    := CASE WHEN pid_matches < 30 THEN 32 ELSE 16 END;
      loser_delta := GREATEST(1, round(k_loser * (1 - expected_w) / n_losers)::INT);

      UPDATE profiles
      SET elo = GREATEST(100, elo - loser_delta),
          losses = losses + 1, matches_played = matches_played + 1, updated_at = NOW()
      WHERE id = pid;

      INSERT INTO match_history (match_id, player_id, opponent_id, won, elo_change)
      VALUES (p_match_id, pid, p_winner_id, FALSE, -loser_delta);
    END IF;
  END LOOP;
END;
$$;

-- ------------------------------------------------------------
-- 10. heartbeat (oppdatert for N spillere)
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION heartbeat(p_match_id UUID)
RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  me UUID := auth.uid();
BEGIN
  IF me IS NULL THEN RETURN; END IF;
  UPDATE matches
  SET player_last_seen = player_last_seen || jsonb_build_object(me::TEXT, NOW()::TEXT)
  WHERE id = p_match_id AND status = 'active' AND player_ids @> ARRAY[me];
END;
$$;

-- ------------------------------------------------------------
-- 11. draw_chance_card (oppdatert for N spillere)
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION draw_chance_card(p_match_id UUID)
RETURNS TABLE(text TEXT, is_sabotage BOOLEAN)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  me           UUID := auth.uid();
  m            RECORD;
  total_weight NUMERIC;
  roll         NUMERIC;
  acc          NUMERIC := 0;
  c            RECORD;
  chosen       RECORD;
BEGIN
  IF me IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;

  SELECT * INTO m FROM matches WHERE id = p_match_id;
  IF m IS NULL                            THEN RAISE EXCEPTION 'Match not found';             END IF;
  IF m.status <> 'active'                 THEN RAISE EXCEPTION 'Match is not active';         END IF;
  IF NOT (m.player_ids @> ARRAY[me])      THEN RAISE EXCEPTION 'Not a player in this match'; END IF;
  IF m.player_ids[m.current_turn_index] <> me THEN RAISE EXCEPTION 'Not your turn';          END IF;

  SELECT SUM(weight) INTO total_weight FROM chance_cards;
  IF total_weight IS NULL OR total_weight = 0 THEN RAISE EXCEPTION 'No chance cards configured'; END IF;

  roll := random() * total_weight;
  FOR c IN SELECT id, chance_cards.text, chance_cards.weight, chance_cards.is_sabotage
           FROM chance_cards ORDER BY id LOOP
    acc := acc + c.weight;
    IF roll <= acc THEN chosen := c; EXIT; END IF;
  END LOOP;

  UPDATE match_state
  SET chance_cards_used = COALESCE(chance_cards_used, '[]'::jsonb)
                          || jsonb_build_object('player', me::TEXT, 'card_id', chosen.id, 'at', NOW()),
      updated_at = NOW()
  WHERE match_id = p_match_id;

  RETURN QUERY SELECT chosen.text, chosen.is_sabotage;
END;
$$;

-- ------------------------------------------------------------
-- 12. forfeit_stale_matches (oppdatert for N spillere)
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION forfeit_stale_matches()
RETURNS INT
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  m              RECORD;
  pid            UUID;
  active_players UUID[];
  count          INT := 0;
BEGIN
  FOR m IN SELECT * FROM matches WHERE status = 'active' LOOP
    active_players := '{}';
    FOREACH pid IN ARRAY m.player_ids LOOP
      IF (m.player_last_seen ->> pid::TEXT) IS NOT NULL
         AND (m.player_last_seen ->> pid::TEXT)::TIMESTAMPTZ >= NOW() - INTERVAL '30 seconds'
      THEN
        active_players := active_players || ARRAY[pid];
      END IF;
    END LOOP;

    IF array_length(active_players, 1) IS NULL OR array_length(active_players, 1) = 0 THEN
      UPDATE matches SET status = 'finished', finished_at = NOW() WHERE id = m.id;
      count := count + 1;
    ELSIF array_length(active_players, 1) = 1 THEN
      PERFORM finish_match(m.id, active_players[1]);
      count := count + 1;
    END IF;
  END LOOP;
  RETURN count;
END;
$$;

-- ------------------------------------------------------------
-- 13. cancel_matchmaking (oppdatert til å forlate lobby)
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION cancel_matchmaking()
RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;
  DELETE FROM matchmaking_queue WHERE player_id = auth.uid();
  PERFORM leave_lobby();
END;
$$;

-- ------------------------------------------------------------
-- 14. Grants
-- ------------------------------------------------------------
REVOKE ALL ON FUNCTION find_or_create_match()                   FROM PUBLIC;
REVOKE ALL ON FUNCTION leave_lobby()                             FROM PUBLIC;
REVOKE ALL ON FUNCTION start_match(UUID)                         FROM PUBLIC;
REVOKE ALL ON FUNCTION leave_active_match()                      FROM PUBLIC;
REVOKE ALL ON FUNCTION get_question_for_match(UUID, TEXT, TEXT)  FROM PUBLIC;
REVOKE ALL ON FUNCTION submit_answer(UUID, INT, TEXT)            FROM PUBLIC;
REVOKE ALL ON FUNCTION draw_chance_card(UUID)                    FROM PUBLIC;
REVOKE ALL ON FUNCTION heartbeat(UUID)                           FROM PUBLIC;
REVOKE ALL ON FUNCTION cancel_matchmaking()                      FROM PUBLIC;
REVOKE ALL ON FUNCTION finish_match(UUID, UUID)                  FROM PUBLIC;
REVOKE ALL ON FUNCTION forfeit_stale_matches()                   FROM PUBLIC;

GRANT EXECUTE ON FUNCTION find_or_create_match()                  TO authenticated;
GRANT EXECUTE ON FUNCTION leave_lobby()                            TO authenticated;
GRANT EXECUTE ON FUNCTION start_match(UUID)                        TO authenticated;
GRANT EXECUTE ON FUNCTION leave_active_match()                     TO authenticated;
GRANT EXECUTE ON FUNCTION get_question_for_match(UUID, TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION submit_answer(UUID, INT, TEXT)           TO authenticated;
GRANT EXECUTE ON FUNCTION draw_chance_card(UUID)                   TO authenticated;
GRANT EXECUTE ON FUNCTION heartbeat(UUID)                          TO authenticated;
GRANT EXECUTE ON FUNCTION cancel_matchmaking()                     TO authenticated;

COMMIT;

-- ============================================================
-- FERDIG. Kjør denne i Supabase SQL Editor.
-- ============================================================
