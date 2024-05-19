import { Context } from "https://deno.land/x/hono@v4.3.7/context.ts";
import {
  WSContext,
  WSMessageReceive,
} from "https://deno.land/x/hono@v4.3.7/helper/websocket/index.ts";

const rooms = new Map<string, Set<WSContext>>();

export function handleWS(c: Context) {
  const roomId = c.req.param("id");

  return {
    onOpen: (_event: Event, ws: WSContext) => {
      console.log(`Connected (roomId: ${roomId})`);
      if (!rooms.has(roomId)) {
        rooms.set(roomId, new Set());
      }
      const sockets = rooms.get(roomId);
      sockets?.add(ws);
    },
    onMessage: (event: MessageEvent<WSMessageReceive>, sender: WSContext) => {
      console.log(`Message from client: ${event.data}`);
      const sockets = rooms.get(roomId);
      sockets?.forEach((ws) => {
        if (ws !== sender) {
          ws.send(`${event.data}`);
        }
      });
    },
    onClose: (_event: CloseEvent, ws: WSContext) => {
      console.log(`Disconnected (roomId: ${roomId})`);
      const sockets = rooms.get(roomId);
      sockets?.delete(ws);
      if (sockets?.size === 0) {
        rooms.delete(roomId);
      }
    },
    onError: (error: Event) => {
      console.error("Error:", error);
    },
  };
}
