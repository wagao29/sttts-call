/** @jsx jsx */
import { css, html } from "https://deno.land/x/hono@v4.3.7/helper.ts";
import { FC, jsx } from "https://deno.land/x/hono@v4.3.7/middleware.ts";
import { LangCode } from "../../constants.ts";
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
