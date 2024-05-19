/** @jsx jsx */
import { upgradeWebSocket } from "https://deno.land/x/hono@v4.3.7/helper.ts";
import {
  jsx,
  serveStatic,
} from "https://deno.land/x/hono@v4.3.7/middleware.ts";
import { Hono } from "https://deno.land/x/hono@v4.3.7/mod.ts";
import { Room } from "./ui/pages/room.tsx";
import { Top } from "./ui/pages/top.tsx";
import { handleWS } from "./ws_server.ts";

const roomIdPattern = /^[0-9a-f]{8}$/;
const MAX_NAME_LENGTH = 10;

const app = new Hono();

app.get("/static/*", serveStatic({ root: "./" }));

app.get("/", (c) => {
  const { room_id } = c.req.query();
  const roomId = room_id || crypto.randomUUID().substring(0, 8);
  return c.html(<Top roomId={roomId} />);
});

app.get("/room/:id", (c) => {
  const { id } = c.req.param();
  const { name } = c.req.query();
  if (
    roomIdPattern.test(id) &&
    name.length > 0 &&
    name.length <= MAX_NAME_LENGTH
  ) {
    return c.html(<Room roomId={id} name={name} />);
  } else {
    return c.notFound();
  }
});

app.get("/ws/:id", upgradeWebSocket(handleWS));

Deno.serve({ port: 8000 }, app.fetch);
