import { Context } from "https://deno.land/x/hono@v4.3.7/context.ts";
import {
  WSContext,
  WSMessageReceive,
} from "https://deno.land/x/hono@v4.3.7/helper/websocket/index.ts";

const rooms = new Map<string, Set<WSContext>>();

function sendBroadcast(
  sockets: Set<WSContext>,
  sender: WSContext,
  data: string
) {
  for (const ws of sockets) {
    if (ws !== sender) {
      ws.send(data);
    }
  }
}

export function handleWS(c: Context) {
  const { id } = c.req.param();
  const { name } = c.req.query();

  return {
    onOpen: (_event: Event, sender: WSContext) => {
      console.log(`Connected (room_id: ${id})`);
      if (!rooms.has(id)) {
        rooms.set(id, new Set());
      }
      const sockets = rooms.get(id);
      if (sockets) {
        sockets.add(sender);
        const data = JSON.stringify({
          type: "join",
          name: name,
        });
        sendBroadcast(sockets, sender, data);
      }
    },
    onMessage: (event: MessageEvent<WSMessageReceive>, sender: WSContext) => {
      console.log(`Message from client: ${event.data}`);
      const sockets = rooms.get(id);
      if (sockets) {
        sendBroadcast(sockets, sender, `${event.data}`);
      }
    },
    onClose: (_event: CloseEvent, sender: WSContext) => {
      console.log(`Disconnected (room_id: ${id})`);
      const sockets = rooms.get(id);
      if (sockets) {
        sockets.delete(sender);
        if (sockets.size === 0) {
          rooms.delete(id);
        } else {
          const data = JSON.stringify({
            type: "leave",
            name: name,
          });
          sendBroadcast(sockets, sender, data);
        }
      }
    },
    onError: (error: Event) => {
      console.error("Error:", error);
    },
  };
}
