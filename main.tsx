/** @jsx jsx */
import { upgradeWebSocket } from "https://deno.land/x/hono@v4.3.7/helper.ts";
import {
  jsx,
  serveStatic,
} from "https://deno.land/x/hono@v4.3.7/middleware.ts";
import { Hono } from "https://deno.land/x/hono@v4.3.7/mod.ts";
import { MAX_NAME_LENGTH, ROOM_ID_PATTERN, Rooms } from "./constants.ts";
import { Room } from "./ui/pages/room.tsx";
import { Top } from "./ui/pages/top.tsx";
import { isDuplicateName, isFullRoom } from "./utils.ts";
import { handleWS } from "./ws_server.ts";

export const rooms: Rooms = {};

const app = new Hono();

app.get("/static/*", serveStatic({ root: "./" }));

app.get("/", (c) => {
  const { room_id, lang } = c.req.query();
  const roomId = room_id || crypto.randomUUID().substring(0, 8);
  return c.html(<Top roomId={roomId} lang={lang} />);
});

app.get("/room/:id", (c) => {
  const { id } = c.req.param();
  const { name, lang } = c.req.query();

  // TODO: Add lang validation

  if (!ROOM_ID_PATTERN.test(id)) {
    console.log("room id format error");
    // TODO: Add room id format error page
    return c.notFound();
  }
  if (!name || name.length > MAX_NAME_LENGTH) {
    console.log("name length error");
    // TODO: Add name length error page
    return c.notFound();
  }
  if (rooms[id] && isFullRoom(rooms[id])) {
    console.log("full room error");
    // TODO: Add full room error page
    return c.notFound();
  }
  if (rooms[id] && isDuplicateName(rooms[id], name)) {
    console.log("name duplicate error");
    // TODO: Add name duplicate error page
    return c.notFound();
  }

  return c.html(<Room roomId={id} name={name} lang={lang} />);
});

app.get("/ws/:id", upgradeWebSocket(handleWS));

Deno.serve({ port: 8000 }, app.fetch);
