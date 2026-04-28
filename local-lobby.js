// Enkel lokal lobby-klient uten database
// Krever at du kjører tools/lobby_server.py (WebSocket server)

(function(){
  const UI = {
    name: () => document.getElementById('localNameInput'),
    code: () => document.getElementById('localLobbyCodeInput'),
    createBtn: () => document.getElementById('localCreateBtn'),
    joinBtn: () => document.getElementById('localJoinBtn'),
    leaveBtn: () => document.getElementById('localLeaveBtn'),
    startBtn: () => document.getElementById('localStartBtn'),
    members: () => document.getElementById('localLobbyMembers'),
    status: () => document.getElementById('localLobbyStatus'),
    section: () => document.getElementById('localLobbySection'),
  };

  const state = {
    ws: null,
    connected: false,
    room: null,
    name: null,
    meId: null,
    hostId: null,
  };

  function wsUrl() {
    // Tillat eksplisitt override via global variabel for produksjon (Cloudflare Tunnel/Workers)
    if (window.LOCAL_LOBBY_WS) return window.LOCAL_LOBBY_WS;
    const host = location.hostname; // fungerer lokalt og på LAN (bruk lærerens IP)
    const proto = location.protocol === 'https:' ? 'wss' : 'ws';
    const port = window.LOCAL_LOBBY_PORT || 8765;
    return `${proto}://${host}:${port}`;
  }

  function log(msg){ console.log('[local-lobby]', msg); }

  function setStatus(text){
    UI.status().textContent = text || '';
  }

  function updateButtons(){
    const inRoom = !!state.room;
    UI.createBtn().disabled = inRoom;
    UI.joinBtn().disabled = inRoom;
    UI.leaveBtn().disabled = !inRoom;
    UI.startBtn().classList.toggle('hidden', !(inRoom && state.meId && state.hostId && state.meId === state.hostId));
  }

  function renderMembers(members){
    UI.members().innerHTML = members.map(m => {
      const crown = (m.id === state.hostId) ? ' 👑' : '';
      const me = (m.id === state.meId) ? ' (deg)' : '';
      return `<li>${escapeHtml(m.name)}${me}${crown}</li>`;
    }).join('');
  }

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
  }

  function connect(room){
    if (state.ws) return;
    let url = wsUrl();
    if (room) {
      const sep = url.includes('?') ? '&' : '?';
      url = `${url}${sep}room=${encodeURIComponent(room)}`;
    }
    // Hvis vi er på https og URL ikke begynner med wss, så bytt
    const finalUrl = (location.protocol === 'https:' && url.startsWith('ws:')) ? url.replace('ws:', 'wss:') : url;
    setStatus('Kobler til ' + finalUrl + ' ...');
    const ws = new WebSocket(finalUrl);
    state.ws = ws;
    ws.addEventListener('open', () => {
      state.connected = true;
      setStatus('Tilkoblet lokalt lobby-server.');
      // Hvis vi allerede har valgt rom, be om join igjen (auto-reconnect)
      if (state.room && state.name) {
        joinRoom(state.room, state.name);
      }
    });
    ws.addEventListener('message', (ev) => {
      try {
        const data = JSON.parse(ev.data);
        if (data.type === 'members' && data.room === state.room) {
          state.hostId = data.hostId || null;
          renderMembers(data.members || []);
          updateButtons();
        } else if (data.type === 'started' && data.room === state.room) {
          setStatus('Spillet er startet!');
        }
      } catch (e) {}
    });
    ws.addEventListener('close', () => {
      state.connected = false;
      setStatus('Frakoblet fra lobby-server. Prøver igjen om 2 sek...');
      setTimeout(() => { state.ws = null; connect(); }, 2000);
    });
    ws.addEventListener('error', () => {
      setStatus('Feil ved tilkobling. Sjekk at lobby_server.py kjører.');
    });
  }

  function randomCode(){
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let c='';
    for (let i=0;i<6;i++) c += alphabet[Math.floor(Math.random()*alphabet.length)];
    return c;
  }

  function createLobby(){
    const name = (UI.name().value || '').trim();
    if (!name) { alert('Skriv inn et navn.'); return; }
    const code = randomCode();
    UI.code().value = code;
    joinRoom(code, name);
  }

  function joinLobby(){
    const name = (UI.name().value || '').trim();
    const code = (UI.code().value || '').trim().toUpperCase();
    if (!name) { alert('Skriv inn et navn.'); return; }
    if (!code) { alert('Skriv inn lobbykoden.'); return; }
    joinRoom(code, name);
  }

  function leaveLobby(){
    if (!state.ws || !state.connected || !state.room) return;
    state.ws.send(JSON.stringify({ type:'leave', room: state.room }));
    state.room = null; state.name = null; state.hostId = null;
    UI.members().innerHTML = '';
    setStatus('Forlot lobbyen.');
    updateButtons();
  }

  function startLobby(){
    if (!state.ws || !state.connected || !state.room) return;
    state.ws.send(JSON.stringify({ type:'start', room: state.room }));
  }

  function joinRoom(code, name){
    connect(code);
    if (!state.ws || state.ws.readyState !== WebSocket.OPEN) {
      // vent en liten stund og prøv
      setTimeout(() => joinRoom(code, name), 250);
      return;
    }
    state.room = code;
    state.name = name;
    if (!state.meId) state.meId = Math.random().toString(36).slice(2,10); // kun for UI markering
    UI.members().innerHTML = '';
    setStatus('Bli med i lobby ' + code + ' ...');
    // Cloudflare Worker forventer at room sendes i query, men vår DO aksepterer den også inni meldingen.
    state.ws.send(JSON.stringify({ type:'join', room: code, name }));
    updateButtons();
  }

  // UI-wire
  window.createLocalLobby = createLobby;
  window.joinLocalLobby = joinLobby;
  window.leaveLocalLobby = leaveLobby;
  window.startLocalLobby = startLobby;

  // Autokoble
  connect();
})();
