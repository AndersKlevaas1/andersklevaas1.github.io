# Code Island – Cloudflare‑klar uten database

Dette repoet er ryddet for Supabase og satt opp for lobby uten database.

Hva følger med
- Statisk nettside (index.html, style.css, script.js)
- Lokal/Cloudflare lobby uten DB: local-lobby.js + tools/lobby_server.py
- Cloudflare Worker (Durable Object) som lobby: cloudflare/src/worker.js + wrangler.toml

Kjør lokalt (testing)
1) HTTP‑server for filer:
	py -m http.server 5500 --bind 0.0.0.0
2) Lokal lobby‑server:
	py tools/lobby_server.py --host 0.0.0.0 --port 8765
3) Åpne http://127.0.0.1:5500 og bruk «Lokal lobby (uten database)».

Cloudflare – produksjon via Worker (uten egen server)
1) Opprett en Worker i Cloudflare Dashboard.
2) Lim inn koden fra cloudflare/src/worker.js i editoren.
3) Legg til Durable Object‑binding:
	- Binding name: ROOM
	- Class name: Room
4) Publiser. Noter Worker‑URL (wss endepunkt = https://…/ws).
5) I index.html, før local-lobby.js, legg inn linjen under med din URL:
	<script>window.LOCAL_LOBBY_WS = 'wss://code-island-lobby.yourname.workers.dev/ws';</script>
6) Host de statiske filene på GitHub Pages eller Cloudflare Pages.

Alternativ: Cloudflare Tunnel til lokal lobby
1) cloudflared tunnel --url http://127.0.0.1:8765
2) Legg wss‑URL i index.html som i steg 5 over.

Notater
- Ingen innlogging. Navn + kode holder.
- Lobbytilstand er kun i minnet (i Python‑serveren eller Durable Object‑instansen).
- Vil du trigge «Start spill» inn i script.js? Lytt på hendelsen `started` i local-lobby.js og kall din spillstartfunksjon.
