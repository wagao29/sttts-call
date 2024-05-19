import { Context } from "https://deno.land/x/hono@v4.3.7/context.ts";
import {
  WSContext,
  WSMessageReceive,
} from "https://deno.land/x/hono@v4.3.7/helper/websocket/index.ts";

const sockets: Set<WSContext> = new Set();

export function handleWS(c: Context) {
  const id = c.req.param("id");
  console.log(id);

  return {
    onOpen: (_event: Event, ws: WSContext) => {
      sockets.add(ws);
      console.log("CONNECTED");
    },
    onMessage: (event: MessageEvent<WSMessageReceive>, sender: WSContext) => {
      console.log(`Message from client: ${event.data}`);
      sockets.forEach((ws) => {
        if (ws !== sender) {
          ws.send(`${event.data}`);
        }
      });
    },
    onClose: (_event: CloseEvent, ws: WSContext) => {
      sockets.delete(ws);
      console.log("Connection closed");
    },
    onError: (error: Event) => {
      console.error("ERROR:", error);
    },
  };
}
