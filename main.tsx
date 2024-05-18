/** @jsx jsx */
import { upgradeWebSocket } from "https://deno.land/x/hono@v4.3.7/helper.ts";
import {
  jsx,
  serveStatic,
} from "https://deno.land/x/hono@v4.3.7/middleware.ts";
import { Hono } from "https://deno.land/x/hono@v4.3.7/mod.ts";
import { Top } from "./ui/pages/top.tsx";
import { handleWS } from "./ws_server.ts";

const app = new Hono();

app.get("/", (c) => {
  return c.html(<Top />);
});

app.get("/static/*", serveStatic({ root: "./" }));

app.get("/ws", upgradeWebSocket(handleWS));

Deno.serve({ port: 8000 }, app.fetch);
