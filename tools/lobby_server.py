#!/usr/bin/env python3
"""
Enkel lobby-server uten database.
- In-memory rom (kode -> medlemmer)
- WebSocket-protokoll med JSON-meldinger

Kommandoer fra klient:
  {"type":"join",  "room":"ABC123", "name":"Ola"}
  {"type":"leave", "room":"ABC123"}
  {"type":"start", "room":"ABC123"}

Server-broadcasts til alle i rommet:
  {"type":"members", "room":"ABC123", "members":[{"id":"...","name":"Ola"}, ...], "hostId":"..."}
  {"type":"started", "room":"ABC123"}

Kjøring:
  pip install websockets
  python tools/lobby_server.py --host 0.0.0.0 --port 8765

Elever kobler seg til via ws://LÆRER-IP:8765 fra nettleseren.
"""
import argparse
import asyncio
import json
import secrets
import string
from typing import Dict, List

import websockets
from websockets.server import WebSocketServerProtocol


class LobbyServer:
    def __init__(self):
        # room_code -> { 'clients': set[WebSocket], 'names': {ws: name}, 'host': WebSocket }
        self.rooms: Dict[str, Dict] = {}

    async def handler(self, ws: WebSocketServerProtocol):
        ws.room = None  # type: ignore[attr-defined]
        ws.id = self._gen_id()  # type: ignore[attr-defined]
        try:
            async for msg in ws:
                try:
                    data = json.loads(msg)
                except Exception:
                    continue
                t = data.get("type")
                if t == "join":
                    await self._join(ws, data.get("room"), data.get("name"))
                elif t == "leave":
                    await self._leave(ws)
                elif t == "start":
                    await self._start(ws)
        except websockets.ConnectionClosed:
            pass
        finally:
            await self._leave(ws)

    async def _join(self, ws: WebSocketServerProtocol, room: str, name: str):
        if not room or not isinstance(room, str):
            return
        room = room.strip().upper()
        if not name or not isinstance(name, str):
            name = "Spiller"
        # Lag rom om nødvendig
        r = self.rooms.get(room)
        if not r:
            r = {"clients": set(), "names": {}, "host": ws}
            self.rooms[room] = r
        # Bli med
        r["clients"].add(ws)
        r["names"][ws] = name[:20]
        ws.room = room  # type: ignore[attr-defined]
        await self._broadcast_members(room)

    async def _leave(self, ws: WebSocketServerProtocol):
        room = getattr(ws, "room", None)
        if not room:
            return
        r = self.rooms.get(room)
        if not r:
            return
        r["clients"].discard(ws)
        r["names"].pop(ws, None)
        # Hvis hosten forsvinner, sett ny host hvis mulig
        if r.get("host") is ws:
            r["host"] = next(iter(r["clients"])) if r["clients"] else None
        if not r["clients"]:
            self.rooms.pop(room, None)
            return
        await self._broadcast_members(room)
        ws.room = None  # type: ignore[attr-defined]

    async def _start(self, ws: WebSocketServerProtocol):
        room = getattr(ws, "room", None)
        if not room:
            return
        r = self.rooms.get(room)
        if not r:
            return
        if r.get("host") is not ws:
            return  # kun host
        payload = json.dumps({"type": "started", "room": room})
        await asyncio.gather(*(c.send(payload) for c in list(r["clients"])) )

    async def _broadcast_members(self, room: str):
        r = self.rooms.get(room)
        if not r:
            return
        host_ws = r.get("host")
        host_id = getattr(host_ws, "id", None) if host_ws else None
        members: List[Dict[str, str]] = []
        for c in list(r["clients"]):
            members.append({"id": getattr(c, "id", ""), "name": r["names"].get(c, "Spiller")})
        payload = json.dumps({
            "type": "members",
            "room": room,
            "members": members,
            "hostId": host_id,
        })
        await asyncio.gather(*(c.send(payload) for c in list(r["clients"])) )

    def _gen_id(self) -> str:
        alphabet = string.ascii_lowercase + string.digits
        return ''.join(secrets.choice(alphabet) for _ in range(8))


async def main(host: str, port: int):
    server = LobbyServer()
    print(f"Starting lobby server on ws://{host}:{port}")
    async with websockets.serve(server.handler, host, port, max_size=1_000_000):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--host", default="127.0.0.1")
    ap.add_argument("--port", type=int, default=8765)
    args = ap.parse_args()
    asyncio.run(main(args.host, args.port))
