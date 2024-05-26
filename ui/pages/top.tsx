/** @jsx jsx */
import { css } from "https://deno.land/x/hono@v4.3.7/helper.ts";
import { FC, jsx } from "https://deno.land/x/hono@v4.3.7/middleware.ts";
import { BaseLayout } from "../layouts/BaseLayout.tsx";
import { TopForm } from "../templates/TopForm.tsx";

const descriptionClass = css`
  text-align: center;
  margin-top: 80px;
  font-size: var(--font-size-large);
`;

const formWrapperClass = css`
  width: 100%;
  margin-top: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Top: FC<{ roomId: string; lang?: string }> = (props: {
  roomId: string;
  lang?: string;
}) => {
  const { roomId, lang } = props;

  return (
    <BaseLayout>
      <p class={descriptionClass}>Call by SpeechToText and TextToSpeech</p>
      <div class={formWrapperClass}>
        <TopForm roomId={roomId} lang={lang} />
      </div>
    </BaseLayout>
  );
};
