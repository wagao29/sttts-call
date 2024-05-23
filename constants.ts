import { WSContext } from "https://deno.land/x/hono@v4.3.7/helper/websocket/index.ts";

export const MAX_NAME_LENGTH = 10;

export const MAX_ROOM_USER = 4;

export const ROOM_ID_PATTERN = /^[0-9a-f]{8}$/;

export type RoomId = string;

export type UserName = string;

export type Room = {
  [key: UserName]: WSContext;
};

export type Rooms = {
  [key: RoomId]: Room;
};

export const rooms: Rooms = {};
