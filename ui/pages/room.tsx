/** @jsx jsx */
import { html } from "https://deno.land/x/hono@v4.3.7/helper.ts";
import { FC, jsx } from "https://deno.land/x/hono@v4.3.7/middleware.ts";
import { BaseLayout } from "../layouts/BaseLayout.tsx";

export const Room: FC<{ roomId: string; name: string }> = (props: {
  roomId: string;
  name: string;
}) => {
  const { roomId, name } = props;

  return (
    <BaseLayout>
      <a href="/">トップへ</a>
      <p>RoomID: {roomId}</p>
      <p>Name: {name}</p>
      <button id="speak-btn">speak</button>
      <div id="output"></div>
      {html` <script type="module" src="/static/scripts/client.js"></script> `}
    </BaseLayout>
  );
};
