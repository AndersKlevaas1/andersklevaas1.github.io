export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/ws') {
      // Oppgrader til WebSocket og ruter til riktig rom (Durable Object) basert på query room=<KODE>
      const pair = new WebSocketPair();
      const [client, server] = Object.values(pair);
      const roomCode = (url.searchParams.get('room') || '').toUpperCase();
      if (!roomCode) {
        server.accept();
        server.send(JSON.stringify({ type: 'error', message: 'room parameter missing' }));
        server.close(1008, 'room missing');
        return new Response(null, { status: 101, webSocket: client });
      }
      const id = env.ROOM.idFromName(roomCode);
      const stub = env.ROOM.get(id);
      await stub.fetch('https://do.invalid/connect', { webSocket: server, headers: { 'Room-Code': roomCode } });
      return new Response(null, { status: 101, webSocket: client });
    }

    // Helsecheck
    if (url.pathname === '/health') {
      return new Response('ok', { status: 200 });
    }

    return new Response('Not found', { status: 404 });
  }
}

export class Room {
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.clients = new Map(); // ws -> {id, name}
    this.host = null; // ws
  }

  async fetch(request) {
    const upgradeHeader = request.headers.get('Upgrade');
    if (upgradeHeader !== 'websocket') {
      return new Response('Expected websocket', { status: 426 });
    }
    const room = request.headers.get('Room-Code') || 'ROOM';
    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);

    server.accept();

    // Ny tilkobling venter på første melding: {type:'join', name:'...'}
    server.addEventListener('message', async (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'join') {
          const id = crypto.randomUUID().slice(0, 8);
          const name = String(data.name || 'Spiller').slice(0, 20);
          this.clients.set(server, { id, name });
          if (!this.host) this.host = server;
          await this.broadcastMembers(room);
        } else if (data.type === 'leave') {
          await this.disconnect(server, room);
        } else if (data.type === 'start') {
          if (server === this.host) await this.broadcast({ type: 'started', room });
        }
      } catch (_) {}
    });

    server.addEventListener('close', async () => {
      await this.disconnect(server, room);
    });

    return new Response(null, { status: 101, webSocket: client });
  }

  async disconnect(ws, room) {
    const wasHost = (ws === this.host);
    this.clients.delete(ws);
    if (wasHost) this.host = this.clients.keys().next().value || null;
    if (this.clients.size === 0) return; // DO blir stående, men uten klienter
    await this.broadcastMembers(room);
  }

  async broadcast(obj) {
    const msg = JSON.stringify(obj);
    const drops = [];
    for (const ws of this.clients.keys()) {
      try { ws.send(msg); } catch { drops.push(ws); }
    }
    drops.forEach(ws => this.clients.delete(ws));
  }

  async broadcastMembers(room) {
    const members = Array.from(this.clients.values()).map(({ id, name }) => ({ id, name }));
    const hostId = this.host ? (this.clients.get(this.host)?.id || null) : null;
    await this.broadcast({ type: 'members', room, members, hostId });
  }
}
