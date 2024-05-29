import { css } from "@hono/hono/css";
import { FC } from "@hono/hono/jsx";
import { LangCode } from "../../constants.ts";
import { BaseLayout } from "../layouts/BaseLayout.tsx";
import { TopForm } from "../templates/TopForm.tsx";

const wrapperClass = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const descriptionClass = css`
  text-align: center;
  font-size: var(--font-size-large);
  line-height: 1.5;
`;

const formWrapperClass = css`
  width: 100%;
  margin-top: 50px;
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
      <div class={wrapperClass}>
        <p class={descriptionClass}>
          Calling app built by connecting
          <br />
          Speech-to-Text and Text-to-Speech
        </p>
        <div class={formWrapperClass}>
          <TopForm roomId={roomId} defaultLang={defaultLang} lang={lang} />
        </div>
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
