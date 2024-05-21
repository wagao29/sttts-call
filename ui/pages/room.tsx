/** @jsx jsx */
import { html } from "https://deno.land/x/hono@v4.3.7/helper.ts";
import { FC, jsx } from "https://deno.land/x/hono@v4.3.7/middleware.ts";
import { BaseLayout } from "../layouts/BaseLayout.tsx";
import { Footer } from "../templates/Footer.tsx";

export const Room: FC<{ roomId: string; name: string }> = (props: {
  roomId: string;
  name: string;
}) => {
  const { roomId, name } = props;

  return (
    <BaseLayout>
      <p>Name: {name}</p>
      <div id="output"></div>
      <Footer roomId={roomId} />
      {html` <script type="module" src="/static/scripts/client.js"></script> `}
    </BaseLayout>
  );
};
