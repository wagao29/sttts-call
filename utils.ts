import { MAX_ROOM_USER, Room, UserName } from "./constants.ts";

export function isFullRoom(room: Room) {
  return Object.keys(room).length === MAX_ROOM_USER;
}

export function isDuplicateName(room: Room, name: UserName) {
  return Object.hasOwn(room, name);
}
