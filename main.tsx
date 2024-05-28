import { Hono } from "@hono/hono";
import { serveStatic, upgradeWebSocket } from "@hono/hono/deno";
import {
  LANGUAGE_LIST,
  LangCode,
  MAX_NAME_LENGTH,
  ROOM_ID_PATTERN,
  Rooms,
} from "./constants.ts";
import { Error } from "./ui/pages/error.tsx";
import { Room } from "./ui/pages/room.tsx";
import { Top } from "./ui/pages/top.tsx";
import { isDuplicateName, isFullRoom, isValidLang } from "./utils.ts";
import { handleWS } from "./ws_server.ts";

export const rooms: Rooms = {};

const app = new Hono();

app.get("/static/*", serveStatic({ root: "./" }));

app.get("/", (c) => {
  const { room_id, lang } = c.req.query();

  if (room_id && !ROOM_ID_PATTERN.test(room_id)) {
    return c.html(<Error message="Room ID has invalid format" />);
  }
  if (lang && !isValidLang(lang)) {
    return c.html(<Error message="Lang Code has invalid format" />);
  }

  const roomId = room_id || crypto.randomUUID().substring(0, 8);

  // Set the default value of language selection to the first of Accept-Language
  const firstAcceptLang =
    c.req.header("Accept-Language")?.split(",")[0] || "en-US";
  const defaultLang = Object.keys(LANGUAGE_LIST).find((langCode) => {
    return langCode.startsWith(firstAcceptLang);
  }) as LangCode;

  return c.html(
    <Top roomId={roomId} defaultLang={defaultLang} lang={lang as LangCode} />
  );
});

app.get("/room/:id", (c) => {
  const { id } = c.req.param();
  const { name, lang } = c.req.query();
  const roomKey = `${id}-${lang}`;

  if (!ROOM_ID_PATTERN.test(id)) {
    return c.html(<Error message="Room ID has invalid format" />);
  }
  if (!lang) {
    return c.html(<Error message="No lang code" />);
  }
  if (!name) {
    return c.html(<Error message="No name" />);
  }
  if (!isValidLang(lang)) {
    return c.html(<Error message="Lang code has invalid format" />);
  }
  if (name.length > MAX_NAME_LENGTH) {
    return c.html(<Error message="Name too long" />);
  }
  if (rooms[roomKey] && isFullRoom(rooms[roomKey])) {
    return c.html(<Error message="The room is full" />);
  }
  if (rooms[roomKey] && isDuplicateName(rooms[roomKey], name)) {
    return c.html(<Error message="The name is already in use" />);
  }

  return c.html(<Room roomId={id} lang={lang as LangCode} />);
});

app.get("/ws/:id", upgradeWebSocket(handleWS));

app.notFound((c) => {
  return c.html(<Error message="404 Not Found" />);
});

Deno.serve({ port: 8000 }, app.fetch);
