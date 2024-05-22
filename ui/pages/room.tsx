/** @jsx jsx */
import { css, html } from "https://deno.land/x/hono@v4.3.7/helper.ts";
import { FC, jsx } from "https://deno.land/x/hono@v4.3.7/middleware.ts";
import { ChatBox } from "../components/ChatBox.tsx";
import { BaseLayout } from "../layouts/BaseLayout.tsx";
import { Footer } from "../templates/Footer.tsx";

const wrapperClass = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const containerClass = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 40px;
  width: 80%;
  height: 80%;
`;

export const Room: FC<{ roomId: string; name: string }> = (props: {
  roomId: string;
  name: string;
}) => {
  const { roomId, name } = props;

  return (
    <BaseLayout>
      <div class={wrapperClass}>
        <div class={containerClass}>
          <ChatBox id="chat-box-1" />
          <ChatBox id="chat-box-2" />
          <ChatBox id="chat-box-3" />
          <ChatBox id="chat-box-4" />
        </div>
      </div>
      <Footer roomId={roomId} />
      {html` <script type="module" src="/static/scripts/client.js"></script> `}
    </BaseLayout>
  );
};
