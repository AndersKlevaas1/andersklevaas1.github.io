// ============================================================
// Ranked Multiplayer — auth, lobby, match, realtime
// Bygger på window.sb (Supabase client fra supabase-client.js)
// ============================================================

const sb = window.sb;

window.rankedState = {
  user: null,
  profile: null,
  matchId: null,
  match: null,
  isHost: false,
  channel: null,
  heartbeatTimer: null,
  currentQuestion: null,
  currentIsland: null,
};

const PROFILE_LOAD_RETRIES = 8;
const PROFILE_LOAD_DELAY_MS = 500;

// ------------------------------------------------------------
// Auth
// ------------------------------------------------------------
function getAuthRedirectUrl() {
  const { protocol, hostname, origin, pathname } = window.location;
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
  const isSecureContext = protocol === 'https:' || (protocol === 'http:' && isLocalhost);

  if (!isSecureContext) {
    throw new Error(
      'Google-innlogging krever at siden kjores fra https:// eller http://localhost. ' +
      'Ikke apne index.html direkte med file://. Start prosjektet via en lokal server eller bruk GitHub Pages.'
    );
  }

  return origin + pathname;
}

async function signInWithGoogle() {
  let redirectTo;
  try {
    redirectTo = getAuthRedirectUrl();
  } catch (error) {
    alert(error.message);
    return;
  }

  const { error } = await sb.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo },
  });
  if (error) alert('Innlogging feilet: ' + error.message);
}

async function signOut() {
  await leaveRankedMatch();
  await sb.auth.signOut();
  window.rankedState.user = null;
  window.rankedState.profile = null;
  renderAuthUI();
}

async function loadProfile() {
  const { user } = window.rankedState;
  if (!user) return;
  const { data, error } = await sb
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();
  if (error) {
    console.error('loadProfile:', error);
    return;
  }
  window.rankedState.profile = data;
}

async function ensureProfileLoaded() {
  for (let attempt = 0; attempt < PROFILE_LOAD_RETRIES; attempt++) {
    await loadProfile();
    if (window.rankedState.profile) return true;
    await new Promise(resolve => setTimeout(resolve, PROFILE_LOAD_DELAY_MS));
  }
  return false;
}

async function resumeActiveMatch() {
  const { user } = window.rankedState;
  if (!user) return;

  const { data, error } = await sb
    .from('matches')
    .select('id, status')
    .contains('player_ids', [user.id])
    .in('status', ['waiting', 'active'])
    .maybeSingle();

  if (error) {
    console.error('resumeActiveMatch:', error);
    return;
  }

  if (data?.status === 'waiting') {
    window.rankedState.matchId = data.id;
    subscribeToMatch(data.id);
    showLobbyView('waiting');
    await refreshLobby();
  } else if (data?.status === 'active') {
    await enterMatch(data.id);
  } else {
    showLobbyView('idle');
  }
}

function renderAuthUI() {
  const { user, profile } = window.rankedState;
  const signInBtn = document.getElementById('signInBtn');
  const userInfo  = document.getElementById('userInfo');
  const lobby     = document.getElementById('rankedLobby');

  if (user) {
    signInBtn.classList.add('hidden');
    userInfo.classList.remove('hidden');
    lobby.classList.remove('hidden');
    document.getElementById('userName').innerText = profile?.username || user.email || '';
    document.getElementById('userElo').innerText  = profile?.elo ?? '–';
  } else {
    signInBtn.classList.remove('hidden');
    userInfo.classList.add('hidden');
    lobby.classList.add('hidden');
  }
}

// ------------------------------------------------------------
// Badge-tracker synkronisering
// ------------------------------------------------------------
const BADGE_ISLAND_KEYS = ['variable', 'datatype', 'object', 'logic', 'loop', 'debug'];

function syncPlayersToTracker(playerIds, playerMap) {
  if (typeof players === 'undefined' || typeof savePlayers === 'undefined') return;
  let changed = false;
  playerIds.forEach(pid => {
    const profile = playerMap[pid];
    if (!profile) return;
    if (!players.find(p => p.id === pid)) {
      players.push({
        id: pid,
        name: profile.username || 'Spiller',
        badges: typeof createEmptyBadges === 'function'
          ? createEmptyBadges()
          : Object.fromEntries(BADGE_ISLAND_KEYS.map(k => [k, false]))
      });
      changed = true;
    }
  });
  if (changed) { savePlayers(); renderBadgeTracker(); }
}

function syncBadgesToTracker(match, playerMap) {
  if (typeof players === 'undefined' || typeof savePlayers === 'undefined') return;
  let changed = false;
  match.player_ids.forEach(pid => {
    const profile = playerMap[pid];
    if (!profile) return;
    let player = players.find(p => p.id === pid);
    if (!player) {
      player = {
        id: pid,
        name: profile.username || 'Spiller',
        badges: Object.fromEntries(BADGE_ISLAND_KEYS.map(k => [k, false]))
      };
      players.push(player);
      changed = true;
    }
    const wonIslands = match.player_islands?.[pid] ?? [];
    BADGE_ISLAND_KEYS.forEach(key => {
      const has = Array.isArray(wonIslands) && wonIslands.includes(key);
      if (player.badges[key] !== has) {
        player.badges[key] = has;
        changed = true;
      }
    });
  });
  if (changed) { savePlayers(); renderBadgeTracker(); }
}

// ------------------------------------------------------------
// Leaderboard
// ------------------------------------------------------------
async function loadLeaderboard() {
  const { data, error } = await sb
    .from('profiles')
    .select('username, elo')
    .order('elo', { ascending: false })
    .limit(10);
  if (error) return console.error(error);
  const list = document.getElementById('leaderboardList');
  list.innerHTML = data
    .map(p => `<li><span class="lb-name">${escapeHtml(p.username)}</span><span class="lb-elo">${p.elo}</span></li>`)
    .join('');
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ------------------------------------------------------------
// Matchmaking / Lobby
// ------------------------------------------------------------
async function findRankedMatch() {
  if (!window.rankedState.user) {
    alert('Logg inn med Google for å bli med i ranked-lobbyen.');
    return;
  }

  const hasProfile = await ensureProfileLoaded();
  if (!hasProfile) {
    alert('Kunne ikke laste spillerprofilen din ennå. Prøv igjen om et par sekunder.');
    return;
  }

  const { data, error } = await sb.rpc('find_or_create_match');
  if (error) {
    alert('Matchmaking feilet: ' + error.message);
    return;
  }

  const result = Array.isArray(data) ? data[0] : data;
  if (!result) return;

  window.rankedState.matchId = result.match_id;

  if (result.match_status === 'waiting') {
    subscribeToMatch(result.match_id);
    showLobbyView('waiting');
    await refreshLobby();
  } else if (result.match_status === 'active') {
    await enterMatch(result.match_id);
  }
}

async function refreshLobby() {
  const { matchId, user } = window.rankedState;
  if (!matchId) return;

  const { data: m, error } = await sb
    .from('matches')
    .select('player_ids, host_id, max_players, status')
    .eq('id', matchId)
    .maybeSingle();

  if (error || !m) return;

  if (m.status === 'active') {
    await enterMatch(matchId);
    return;
  }

  if (m.status === 'finished') {
    await leaveRankedMatch();
    return;
  }

  // Hent spillerprofiler
  const { data: players } = await sb
    .from('profiles')
    .select('id, username, elo')
    .in('id', m.player_ids);

  const playerMap = {};
  (players || []).forEach(p => { playerMap[p.id] = p; });

  const list = document.getElementById('lobbyPlayerList');
  list.innerHTML = m.player_ids.map(pid => {
    const p = playerMap[pid];
    const name = p ? escapeHtml(p.username) : '...';
    const elo  = p ? p.elo : '–';
    const crown = pid === m.host_id ? ' 👑' : '';
    return `<li>${name} (${elo})${crown}</li>`;
  }).join('');

  document.getElementById('lobbyPlayerCount').textContent =
    `${m.player_ids.length} / ${m.max_players} spillere`;

  syncPlayersToTracker(m.player_ids, playerMap);

  const isHost = m.host_id === user.id;
  window.rankedState.isHost = isHost;

  const startBtn = document.getElementById('startMatchBtn');
  const waitMsg  = document.getElementById('lobbyWaitingMsg');
  const canStart = m.player_ids.length >= 2;

  if (isHost) {
    startBtn.classList.remove('hidden');
    startBtn.disabled = !canStart;
    waitMsg.textContent = canStart
      ? 'Du kan starte spillet nå!'
      : 'Venter på flere spillere...';
  } else {
    startBtn.classList.add('hidden');
    waitMsg.textContent = 'Venter på at vertspiller skal starte...';
  }
}

async function startMatch() {
  const { matchId } = window.rankedState;
  if (!matchId) return;
  const { error } = await sb.rpc('start_match', { p_match_id: matchId });
  if (error) {
    alert('Kunne ikke starte: ' + error.message);
    return;
  }
  // Realtime-oppdatering trigger refreshMatch → enterMatch for alle spillere
}

// ------------------------------------------------------------
// Match
// ------------------------------------------------------------
async function enterMatch(matchId) {
  window.rankedState.matchId = matchId;
  subscribeToMatch(matchId);
  startHeartbeat();
  await refreshMatch();
}

async function refreshMatch() {
  const { matchId, user } = window.rankedState;
  if (!matchId) return;

  const { data, error } = await sb
    .from('matches')
    .select('*')
    .eq('id', matchId)
    .maybeSingle();

  if (error || !data) return;

  window.rankedState.match = data;

  if (data.status === 'waiting') {
    showLobbyView('waiting');
    await refreshLobby();
    return;
  }

  if (data.status === 'finished') {
    await handleMatchFinished(data);
    return;
  }

  // Aktiv match
  showLobbyView('match');

  // Hent alle spillerprofiler
  const { data: players } = await sb
    .from('profiles')
    .select('id, username, elo')
    .in('id', data.player_ids);

  const playerMap = {};
  (players || []).forEach(p => { playerMap[p.id] = p; });

  syncBadgesToTracker(data, playerMap);

  // current_turn_index er 1-basert (PostgreSQL-array), player_ids er 0-basert i JS
  const currentPlayerId = data.player_ids[data.current_turn_index - 1];

  const list = document.getElementById('matchPlayerList');
  list.innerHTML = data.player_ids.map(pid => {
    const p         = playerMap[pid];
    const name      = p ? escapeHtml(p.username) : '...';
    const badges    = (data.player_badges?.[pid] ?? 0);
    const isMe      = pid === user.id;
    const isCurrent = pid === currentPlayerId;
    return `<div class="match-player-card${isMe ? ' is-me' : ''}${isCurrent ? ' is-current-turn' : ''}">
      <span class="mpc-name">${name}${isMe ? ' (deg)' : ''}</span>
      <span class="mpc-badges">${badges}/6 🏅</span>
    </div>`;
  }).join('');

  const myTurn       = isMyTurn();
  const turnIndicator = document.getElementById('turnIndicator');
  if (myTurn) {
    turnIndicator.textContent = 'Din tur';
    turnIndicator.className   = 'turn-indicator my-turn';
  } else {
    const cp = playerMap[currentPlayerId];
    turnIndicator.textContent = cp ? `${escapeHtml(cp.username)} sin tur` : 'Motstanders tur';
    turnIndicator.className   = 'turn-indicator their-turn';
  }
}

function isMyTurn() {
  const { match, user } = window.rankedState;
  if (!match || match.status !== 'active') return false;
  // current_turn_index er 1-basert i Postgres, men player_ids er 0-basert i JS
  return match.player_ids[match.current_turn_index - 1] === user.id;
}

function subscribeToMatch(matchId) {
  if (window.rankedState.channel) {
    sb.removeChannel(window.rankedState.channel);
  }
  const ch = sb
    .channel(`match:${matchId}`)
    .on('postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'matches', filter: `id=eq.${matchId}` },
      () => refreshMatch())
    .subscribe();
  window.rankedState.channel = ch;
}

function startHeartbeat() {
  stopHeartbeat();
  window.rankedState.heartbeatTimer = setInterval(async () => {
    const { matchId } = window.rankedState;
    if (!matchId) return;
    await sb.rpc('heartbeat', { p_match_id: matchId });
  }, 5000);
}

function stopHeartbeat() {
  if (window.rankedState.heartbeatTimer) {
    clearInterval(window.rankedState.heartbeatTimer);
    window.rankedState.heartbeatTimer = null;
  }
}

async function leaveRankedMatch() {
  stopHeartbeat();

  const { match, matchId } = window.rankedState;
  if (matchId) {
    if (!match || match.status === 'waiting') {
      await sb.rpc('leave_lobby');
    } else if (match.status === 'active') {
      await sb.rpc('leave_active_match');
    }
  }

  if (window.rankedState.channel) {
    sb.removeChannel(window.rankedState.channel);
    window.rankedState.channel = null;
  }

  window.rankedState.matchId         = null;
  window.rankedState.match           = null;
  window.rankedState.currentQuestion = null;
  window.rankedState.isHost          = false;
  showLobbyView('idle');
}

async function handleMatchFinished(match) {
  const { user } = window.rankedState;
  const iWon = match.winner_id === user.id;
  alert(iWon ? '🎉 Du vant matchen!' : 'Du tapte matchen.');
  await loadProfile();
  await loadLeaderboard();
  renderAuthUI();
  await leaveRankedMatch();
}

// ------------------------------------------------------------
// Ranked island / chance card hooks
// Brukes av script.js sine chooseIsland() og drawChanceCard()
// ------------------------------------------------------------
window.rankedChooseIsland = async function (island) {
  const { matchId } = window.rankedState;
  if (!matchId) return false;
  if (!isMyTurn()) {
    alert('Det er ikke din tur!');
    return true;
  }
  const difficulty = (typeof currentDifficulty !== 'undefined') ? currentDifficulty : 'ez';
  const { data, error } = await sb.rpc('get_question_for_match', {
    p_match_id:   matchId,
    p_island:     island,
    p_difficulty: difficulty,
  });
  if (error) {
    alert('Feil: ' + error.message);
    return true;
  }
  const q = Array.isArray(data) ? data[0] : data;
  if (!q) {
    alert('Ingen spørsmål funnet');
    return true;
  }
  window.rankedState.currentQuestion = q;
  window.rankedState.currentIsland   = island;
  showRankedQuestion(q, island);
  return true;
};

function showRankedQuestion(q, island) {
  const box = document.getElementById('questionBox');
  box.classList.remove('hidden');
  document.getElementById('questionText').innerText = q.question_text;
  const answersDiv = document.getElementById('answers');
  answersDiv.innerHTML = '';

  const options = Array.isArray(q.options) ? q.options : JSON.parse(q.options);
  const indexed = options.map((text, idx) => ({ text, idx }));
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
  }

  indexed.forEach(opt => {
    const btn = document.createElement('button');
    btn.innerText = opt.text;
    btn.classList.add('answer-btn');
    btn.onclick = async () => {
      btn.disabled = true;
      const { data, error } = await sb.rpc('submit_answer', {
        p_match_id:    window.rankedState.matchId,
        p_answer_index: opt.idx,
        p_island:      island,
      });
      if (error) {
        alert('Feil: ' + error.message);
        btn.disabled = false;
        return;
      }
      const result = Array.isArray(data) ? data[0] : data;
      const icon = document.createElement('span');
      icon.classList.add('feedback-icon');
      if (result.correct) {
        const progress = result.island_progress ?? 0;
        const gotBadge = progress >= 3;
        icon.innerText = gotBadge ? '🏅 Badge!' : `✔ (${progress}/3)`;
        icon.classList.add('correct-icon');
      } else {
        icon.innerText = '✖';
        icon.classList.add('wrong-icon');
      }
      btn.appendChild(icon);
      setTimeout(() => {
        box.classList.add('hidden');
        refreshMatch();
      }, 1800);
    };
    answersDiv.appendChild(btn);
  });

  box.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

window.rankedDrawChanceCard = async function () {
  const { matchId } = window.rankedState;
  if (!matchId) return false;
  if (!isMyTurn()) {
    alert('Det er ikke din tur!');
    return true;
  }
  const { data, error } = await sb.rpc('draw_chance_card', { p_match_id: matchId });
  if (error) {
    alert('Feil: ' + error.message);
    return true;
  }
  const card = Array.isArray(data) ? data[0] : data;
  const box  = document.getElementById('chanceCardBox');
  box.classList.remove('hidden');
  document.getElementById('chanceCardText').innerText = card.text;
  box.scrollIntoView({ behavior: 'smooth', block: 'center' });
  return true;
};

// ------------------------------------------------------------
// UI view switching
// ------------------------------------------------------------
function showLobbyView(view) {
  const idle    = document.getElementById('lobbyIdle');
  const waiting = document.getElementById('lobbyWaiting');
  const match   = document.getElementById('lobbyMatch');
  [idle, waiting, match].forEach(el => el.classList.add('hidden'));
  if (view === 'idle')    idle.classList.remove('hidden');
  if (view === 'waiting') waiting.classList.remove('hidden');
  if (view === 'match')   match.classList.remove('hidden');
}

// ------------------------------------------------------------
// Init
// ------------------------------------------------------------
(async function init() {
  const { data: { session } } = await sb.auth.getSession();
  if (session) {
    window.rankedState.user = session.user;
    await ensureProfileLoaded();
  }
  renderAuthUI();
  await loadLeaderboard();
  await resumeActiveMatch();

  sb.auth.onAuthStateChange(async (_event, session) => {
    window.rankedState.user    = session?.user || null;
    window.rankedState.profile = null;
    if (session) {
      await ensureProfileLoaded();
      await resumeActiveMatch();
    } else {
      await leaveRankedMatch();
    }
    renderAuthUI();
    await loadLeaderboard();
  });
})();
