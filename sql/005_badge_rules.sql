-- ============================================================
-- Migration 005 — Badge-regler
-- - Maks 6 spillere
-- - 3 riktige svar per øy for å få badge
-- - 6 ulike badges = vinner automatisk
-- ============================================================
BEGIN;

-- ------------------------------------------------------------
-- 1. Sett max_players til 6
-- ------------------------------------------------------------
ALTER TABLE matches ALTER COLUMN max_players SET DEFAULT 6;
UPDATE matches SET max_players = 6 WHERE status = 'waiting';

-- ------------------------------------------------------------
-- 2. Legg til player_progress — teller riktige svar per øy
--    Struktur: { "player_id": { "variable": 2, "loop": 1, ... } }
-- ------------------------------------------------------------
ALTER TABLE matches
  ADD COLUMN IF NOT EXISTS player_progress JSONB NOT NULL DEFAULT '{}';

-- ------------------------------------------------------------
-- 3. Oppdater find_or_create_match — initialiser player_progress
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

  -- Finn åpen lobby med ledig plass (maks 6)
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
        player_progress  = player_progress  || jsonb_build_object(me::TEXT, '{}'::jsonb),
        player_last_seen = player_last_seen || jsonb_build_object(me::TEXT, NOW()::TEXT)
    WHERE id = open_id;

    SELECT array_length(player_ids, 1) INTO pcount FROM matches WHERE id = open_id;
    RETURN QUERY SELECT open_id, 'waiting'::TEXT, pcount;
    RETURN;
  END IF;

  -- Opprett ny lobby
  INSERT INTO matches (
    player_ids, current_turn_index,
    player_badges, player_islands, player_progress, player_last_seen,
    host_id, max_players, status
  )
  VALUES (
    ARRAY[me], 1,
    jsonb_build_object(me::TEXT, 0),
    jsonb_build_object(me::TEXT, '[]'::jsonb),
    jsonb_build_object(me::TEXT, '{}'::jsonb),
    jsonb_build_object(me::TEXT, NOW()::TEXT),
    me, 6, 'waiting'
  )
  RETURNING id INTO open_id;

  INSERT INTO match_state (match_id, answers_submitted, chance_cards_used)
  VALUES (open_id, '{}'::jsonb, '[]'::jsonb);

  RETURN QUERY SELECT open_id, 'waiting'::TEXT, 1;
END;
$$;

-- ------------------------------------------------------------
-- 4. Oppdater leave_lobby — rydd opp player_progress
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
      player_progress  = player_progress  - me::TEXT,
      player_last_seen = player_last_seen - me::TEXT,
      host_id = CASE WHEN host_id = me THEN new_player_ids[1] ELSE host_id END
  WHERE id = m.id;
END;
$$;

-- ------------------------------------------------------------
-- 5. Oppdater submit_answer — 3 riktige svar per øy for badge
-- ------------------------------------------------------------
DROP FUNCTION IF EXISTS submit_answer(UUID, INT, TEXT);

CREATE OR REPLACE FUNCTION submit_answer(
  p_match_id     UUID,
  p_answer_index INT,
  p_island       TEXT
)
RETURNS TABLE(correct BOOLEAN, my_badges INT, island_progress INT, finished BOOLEAN)
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
  my_new_progress    JSONB;
  island_count       INT;
  island_already_won BOOLEAN;
  new_turn_index     INT;
  match_finished     BOOLEAN := FALSE;
BEGIN
  IF me IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;

  SELECT * INTO m FROM matches WHERE id = p_match_id FOR UPDATE;
  IF m IS NULL                                 THEN RAISE EXCEPTION 'Match not found';             END IF;
  IF m.status <> 'active'                      THEN RAISE EXCEPTION 'Match is not active';         END IF;
  IF NOT (m.player_ids @> ARRAY[me])           THEN RAISE EXCEPTION 'Not a player in this match'; END IF;
  IF m.player_ids[m.current_turn_index] <> me  THEN RAISE EXCEPTION 'Not your turn';              END IF;

  SELECT * INTO st FROM match_state WHERE match_id = p_match_id FOR UPDATE;
  IF st.current_question_id IS NULL THEN RAISE EXCEPTION 'No active question'; END IF;

  SELECT * INTO q FROM questions WHERE id = st.current_question_id;
  is_correct := (q.correct = p_answer_index);

  my_new_badges   := COALESCE((m.player_badges  ->> me::TEXT)::INT, 0);
  my_new_islands  := COALESCE(m.player_islands   -> me::TEXT, '[]'::jsonb);
  my_new_progress := COALESCE(m.player_progress  -> me::TEXT, '{}'::jsonb);

  -- Sjekk om badge for denne øya allerede er vunnet
  SELECT bool_or(val = p_island) INTO island_already_won
  FROM jsonb_array_elements_text(my_new_islands) AS val;

  island_count := COALESCE((my_new_progress ->> p_island)::INT, 0);

  IF is_correct AND NOT COALESCE(island_already_won, FALSE) THEN
    island_count    := island_count + 1;
    my_new_progress := my_new_progress || jsonb_build_object(p_island, island_count);

    -- 3 riktige svar på denne øya = badge
    IF island_count >= 3 THEN
      my_new_badges  := my_new_badges + 1;
      my_new_islands := my_new_islands || to_jsonb(p_island);
    END IF;
  END IF;

  -- Round-robin: neste spiller
  new_turn_index := (m.current_turn_index % array_length(m.player_ids, 1)) + 1;

  UPDATE matches
  SET player_badges    = player_badges    || jsonb_build_object(me::TEXT, my_new_badges),
      player_islands   = player_islands   || jsonb_build_object(me::TEXT, my_new_islands),
      player_progress  = player_progress  || jsonb_build_object(me::TEXT, my_new_progress),
      player_last_seen = player_last_seen || jsonb_build_object(me::TEXT, NOW()::TEXT),
      current_turn_index = new_turn_index
  WHERE id = p_match_id;

  UPDATE match_state
  SET current_question_id = NULL, updated_at = NOW()
  WHERE match_id = p_match_id;

  -- 6 ulike badges = vinner automatisk
  IF my_new_badges >= 6 THEN
    PERFORM finish_match(p_match_id, me);
    match_finished := TRUE;
  END IF;

  RETURN QUERY SELECT is_correct, my_new_badges, island_count, match_finished;
END;
$$;

-- ------------------------------------------------------------
-- 6. Oppdater leave_active_match — rydd opp player_progress
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

  SELECT i INTO my_pos
  FROM generate_subscripts(m.player_ids, 1) i
  WHERE m.player_ids[i] = me;

  SELECT array_agg(pid ORDER BY ord) INTO new_player_ids
  FROM (
    SELECT pid, ROW_NUMBER() OVER () AS ord
    FROM unnest(m.player_ids) AS pid
    WHERE pid <> me
  ) t;

  IF new_player_ids IS NULL OR array_length(new_player_ids, 1) = 0 THEN
    UPDATE matches SET status = 'finished', finished_at = NOW() WHERE id = m.id;
    RETURN;
  END IF;

  IF array_length(new_player_ids, 1) = 1 THEN
    PERFORM finish_match(m.id, new_player_ids[1]);
    RETURN;
  END IF;

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
      player_progress    = player_progress    - me::TEXT,
      player_last_seen   = player_last_seen   - me::TEXT,
      current_turn_index = new_turn_index
  WHERE id = m.id;
END;
$$;

-- Grant for den nye submit_answer-signaturen
GRANT EXECUTE ON FUNCTION submit_answer(UUID, INT, TEXT) TO authenticated;

COMMIT;

-- ============================================================
-- FERDIG. Kjør denne i Supabase SQL Editor.
-- ============================================================
