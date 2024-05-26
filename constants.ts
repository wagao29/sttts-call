import { WSContext } from "https://deno.land/x/hono@v4.3.7/helper/websocket/index.ts";

export const MAX_NAME_LENGTH = 10;

export const MAX_ROOM_USER = 4;

export const ROOM_ID_PATTERN = /^[0-9a-f]{8}$/;

export const LANGUAGE_LIST = {
  "en-US": "English (en-US)",
  "ja-JP": "Japanese (ja-JP)",
  "zh-CN": "Chinese (zh-CN)",
  "ko-KR": "Korean (ko-KR)",
  "fr-FR": "French (fr-FR)",
  "de-DE": "German (de-DE)",
  "es-ES": "Spanish (es-ES)",
  "it-IT": "Italian (it-IT)",
  "pt-PT": "Portuguese (pt-PT)",
  "ru-RU": "Russian (ru-RU)",
};

// {roomId}-{langCode}
export type RoomKey = string;

export type UserName = string;

export type Room = {
  [key: UserName]: WSContext;
};

export type Rooms = {
  [key: RoomKey]: Room;
};

export const rooms: Rooms = {};
