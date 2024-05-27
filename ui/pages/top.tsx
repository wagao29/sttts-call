/** @jsx jsx */
import { css } from "https://deno.land/x/hono@v4.3.7/helper.ts";
import { FC, jsx } from "https://deno.land/x/hono@v4.3.7/middleware.ts";
import { LangCode } from "../../constants.ts";
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

const copyrightClass = css`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, -50%);

  a {
    color: #fff;
  }
`;

type Props = {
  roomId: string;
  defaultLang: LangCode;
  lang?: LangCode;
};

export const Top: FC<Props> = (props: Props) => {
  const { roomId, defaultLang, lang } = props;

  return (
    <BaseLayout>
      <p class={descriptionClass}>Call by SpeechToText and TextToSpeech</p>
      <div class={formWrapperClass}>
        <TopForm roomId={roomId} defaultLang={defaultLang} lang={lang} />
      </div>
      <p class={copyrightClass}>
        {"© 2024 "}
        <a
          href="https://x.com/_wagao_"
          target="_blank"
          rel="noopener noreferrer"
        >
          wagao
        </a>
      </p>
    </BaseLayout>
  );
};
