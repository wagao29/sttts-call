import { css } from "@hono/hono/css";
import { html } from "@hono/hono/html";
import { FC } from "@hono/hono/jsx";
import { LangCode } from "../../constants.ts";
import { ChatBox } from "../components/ChatBox.tsx";
import { BaseLayout } from "../layouts/BaseLayout.tsx";
import { Footer } from "../templates/Footer.tsx";

const wrapperClass = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const containerClass = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  width: 90%;
  height: 90%;
`;

type Props = {
  roomId: string;
  lang: LangCode;
};

export const Room: FC<Props> = (props: Props) => {
  const { roomId, lang } = props;

  return (
    <BaseLayout>
      <div class={wrapperClass}>
        <div class={containerClass} id="chat-box-container">
          <ChatBox />
        </div>
      </div>
      <Footer roomId={roomId} lang={lang} />
      {html` <script type="module" src="/static/scripts/client.js"></script> `}
    </BaseLayout>
  );
};
