import { Context } from "@hono/hono";
import { WSContext, WSMessageReceive } from "@hono/hono/ws";
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
  const { name, lang } = c.req.query();

  const roomKey = `${id}-${lang}`;

  return {
    onOpen: (_event: Event, socket: WSContext) => {
      if (rooms[roomKey]) {
        // Notify the names of users already in the room
        sendRoomUserNames(rooms[roomKey], socket);
      } else {
        // Create a new room
        rooms[roomKey] = {};
      }
      const room = rooms[roomKey];

      if (isFullRoom(room) || isDuplicateName(room, name)) {
        console.log(`Reject connections (roomKey: ${roomKey}, name: ${name})`);
        return;
      }

      room[name] = socket;
      const data = JSON.stringify({
        type: "join",
        name: name,
      });
      sendBroadcast(room, name, data);
      console.log(`Connected (roomKey: ${roomKey}, name: ${name})`);
    },
    onMessage: (event: MessageEvent<WSMessageReceive>, _socket: WSContext) => {
      console.log(
        `Receive Message ${event.data} (roomKey: ${roomKey}, name: ${name}) `
      );
      if (rooms[roomKey]) {
        sendBroadcast(rooms[roomKey], name, `${event.data}`);
      }
    },
    onClose: (_event: CloseEvent, _socket: WSContext) => {
      const room = rooms[roomKey];
      if (!room) return;

      // Delete user from room
      delete room[name];

      if (Object.keys(room).length === 0) {
        // Delete room when there are no users in the room
        delete rooms[roomKey];
      } else {
        const data = JSON.stringify({
          type: "leave",
          name: name,
        });
        sendBroadcast(room, name, data);
      }

      console.log(`Disconnected (roomKey: ${roomKey}, name: ${name})`);
    },
    onError: (error: Event) => {
      console.error("Error:", error);
    },
  };
}
