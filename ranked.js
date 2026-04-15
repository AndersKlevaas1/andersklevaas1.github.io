// ============================================================
// Ranked Multiplayer — auth, lobby, match, realtime
// Bygger på window.sb (Supabase client fra supabase-client.js)
// ============================================================

const sb = window.sb;

// Global ranked state
window.rankedState = {
  user: null,
  profile: null,
  matchId: null,
  match: null,
  isPlayerA: false,
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
    .select('id')
    .or(`player_a_id.eq.${user.id},player_b_id.eq.${user.id}`)
    .eq('status', 'active')
    .maybeSingle();

  if (error) {
    console.error('resumeActiveMatch:', error);
    return;
  }

  if (data) {
    await enterMatch(data.id);
  } else if (!window.rankedState.matchId) {
    showLobbyView('idle');
  }
}

function renderAuthUI() {
  const { user, profile } = window.rankedState;
  const signInBtn = document.getElementById('signInBtn');
  const userInfo = document.getElementById('userInfo');
  const lobby = document.getElementById('rankedLobby');

  if (user) {
    signInBtn.classList.add('hidden');
    userInfo.classList.remove('hidden');
    lobby.classList.remove('hidden');
    document.getElementById('userName').innerText = profile?.username || user.email || '';
    document.getElementById('userElo').innerText = profile?.elo ?? '–';
  } else {
    signInBtn.classList.remove('hidden');
    userInfo.classList.add('hidden');
    lobby.classList.add('hidden');
  }
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
// Matchmaking
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

  if (result.status === 'queued') {
    showLobbyView('queued');
    // Poll for match
    window.rankedState.queuePoll = setInterval(pollForMatch, 2000);
  } else if (result.status === 'matched' || result.status === 'resumed') {
    await enterMatch(result.match_id);
  }
}

async function pollForMatch() {
  const { user } = window.rankedState;
  if (!user) return stopQueuePoll();
  const { data, error } = await sb
    .from('matches')
    .select('id')
    .or(`player_a_id.eq.${user.id},player_b_id.eq.${user.id}`)
    .eq('status', 'active')
    .maybeSingle();
  if (error) return;
  if (data) {
    stopQueuePoll();
    await enterMatch(data.id);
  }
}

function stopQueuePoll() {
  if (window.rankedState.queuePoll) {
    clearInterval(window.rankedState.queuePoll);
    window.rankedState.queuePoll = null;
  }
}

async function cancelQueue() {
  stopQueuePoll();
  await sb.rpc('cancel_matchmaking');
  showLobbyView('idle');
}

// ------------------------------------------------------------
// Match
// ------------------------------------------------------------
async function enterMatch(matchId) {
  window.rankedState.matchId = matchId;
  await refreshMatch();
  subscribeToMatch(matchId);
  startHeartbeat();
  if (window.rankedState.matchId) {
    showLobbyView('match');
  }
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
  window.rankedState.isPlayerA = (data.player_a_id === user.id);

  if (data.status === 'finished') {
    await handleMatchFinished(data);
    return;
  }

  // Hent motstanderens navn
  const opponentId = window.rankedState.isPlayerA ? data.player_b_id : data.player_a_id;
  const { data: opp } = await sb
    .from('profiles')
    .select('username, elo')
    .eq('id', opponentId)
    .maybeSingle();
  document.getElementById('opponentName').innerText = opp ? `${opp.username} (${opp.elo})` : 'Motstander';

  const myBadges = window.rankedState.isPlayerA ? data.player_a_badges : data.player_b_badges;
  const oppBadges = window.rankedState.isPlayerA ? data.player_b_badges : data.player_a_badges;
  document.getElementById('myBadges').innerText = myBadges;
  document.getElementById('opponentBadges').innerText = oppBadges;

  const myTurn = isMyTurn();
  document.getElementById('turnIndicator').innerText = myTurn ? 'Din tur' : 'Motstanders tur';
  document.getElementById('turnIndicator').className = 'turn-indicator ' + (myTurn ? 'my-turn' : 'their-turn');
}

function isMyTurn() {
  const { match, isPlayerA } = window.rankedState;
  if (!match) return false;
  return (match.current_turn === 'player_a' && isPlayerA)
      || (match.current_turn === 'player_b' && !isPlayerA);
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
    .on('postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'match_state', filter: `match_id=eq.${matchId}` },
      () => { /* no-op for now */ })
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
  stopQueuePoll();
  if (window.rankedState.channel) {
    sb.removeChannel(window.rankedState.channel);
    window.rankedState.channel = null;
  }
  window.rankedState.matchId = null;
  window.rankedState.match = null;
  window.rankedState.currentQuestion = null;
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
  // Mapping: script.js bruker 'ez' men DB forventer det samme — vi seeder med 'ez','med','hard'
  const { data, error } = await sb.rpc('get_question_for_match', {
    p_match_id: matchId,
    p_island: island,
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
  window.rankedState.currentIsland = island;
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
  // Shuffle
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
        p_match_id: window.rankedState.matchId,
        p_answer_index: opt.idx,
        p_island: island,
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
        icon.innerText = '✔';
        icon.classList.add('correct-icon');
      } else {
        icon.innerText = '✖';
        icon.classList.add('wrong-icon');
      }
      btn.appendChild(icon);
      setTimeout(() => {
        box.classList.add('hidden');
        refreshMatch();
      }, 1500);
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
  const box = document.getElementById('chanceCardBox');
  box.classList.remove('hidden');
  document.getElementById('chanceCardText').innerText = card.text;
  box.scrollIntoView({ behavior: 'smooth', block: 'center' });
  return true;
};

// ------------------------------------------------------------
// UI view switching
// ------------------------------------------------------------
function showLobbyView(view) {
  const idle = document.getElementById('lobbyIdle');
  const queued = document.getElementById('lobbyQueued');
  const match = document.getElementById('lobbyMatch');
  [idle, queued, match].forEach(el => el.classList.add('hidden'));
  if (view === 'idle') idle.classList.remove('hidden');
  if (view === 'queued') queued.classList.remove('hidden');
  if (view === 'match') match.classList.remove('hidden');
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
    window.rankedState.user = session?.user || null;
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
