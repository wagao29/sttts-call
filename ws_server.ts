import { Context } from "https://deno.land/x/hono@v4.3.7/context.ts";
import {
  WSContext,
  WSMessageReceive,
} from "https://deno.land/x/hono@v4.3.7/helper/websocket/index.ts";
import { Room, UserName } from "./constants.ts";
import { rooms } from "./main.tsx";
import { isDuplicateName, isFullRoom } from "./utils.ts";

function sendBroadcast(room: Room, sender: UserName, data: string) {
  for (const [name, socket] of Object.entries(room)) {
    if (name !== sender) {
      socket.send(data);
    }
  }
}

function sendRoomUserNames(room: Room, socket: WSContext) {
  for (const name of Object.keys(room)) {
    const data = JSON.stringify({
      type: "join",
      name: name,
    });
    socket.send(data);
  }
}

export function handleWS(c: Context) {
  const { id } = c.req.param();
  const { name } = c.req.query();

  return {
    onOpen: (_event: Event, socket: WSContext) => {
      if (rooms[id]) {
        // Notify the names of users already in the room
        sendRoomUserNames(rooms[id], socket);
      } else {
        // Create a new room
        rooms[id] = {};
      }
      const room = rooms[id];

      if (isFullRoom(room) || isDuplicateName(room, name)) {
        console.log(`Reject connections (room_id: ${id}, name: ${name})`);
        return;
      }

      room[name] = socket;
      const data = JSON.stringify({
        type: "join",
        name: name,
      });
      sendBroadcast(room, name, data);
      console.log(`Connected (room_id: ${id}, name: ${name})`);
    },
    onMessage: (event: MessageEvent<WSMessageReceive>, _socket: WSContext) => {
      console.log(
        `Receive Message ${event.data} (room_id: ${id}, name: ${name}) `
      );
      if (rooms[id]) {
        sendBroadcast(rooms[id], name, `${event.data}`);
      }
    },
    onClose: (_event: CloseEvent, _socket: WSContext) => {
      const room = rooms[id];
      if (!room) return;

      // Delete user from room
      delete room[name];

      if (Object.keys(room).length === 0) {
        // Delete room when there are no users in the room
        delete rooms[id];
      } else {
        const data = JSON.stringify({
          type: "leave",
          name: name,
        });
        sendBroadcast(room, name, data);
      }

      console.log(`Disconnected (room_id: ${id}, name: ${name})`);
    },
    onError: (error: Event) => {
      console.error("Error:", error);
    },
  };
}
