/** @jsx jsx */
import { css } from "https://deno.land/x/hono@v4.3.7/helper.ts";
import { FC, jsx } from "https://deno.land/x/hono@v4.3.7/middleware.ts";
import { LangCode } from "../../constants.ts";
import { CopyUrlButton } from "../components/CopyUrlButton.tsx";

const footerClass = css`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: var(--font-size-small);
    text-align: center;
  }
`;

const buttonWrapperClass = css`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  gap: 100px;
`;

type Props = {
  roomId: string;
  lang: LangCode;
};

export const Footer: FC<Props> = (props: Props) => {
  const { roomId, lang } = props;

  return (
    <div class={footerClass}>
      <span>
        {roomId} ({lang})
      </span>
      <div class={buttonWrapperClass}>
        <button id="speak-btn">
          <img src="/static/images/icon-mute.png" width={50} height={50} />
        </button>
        <button id="leave-btn">
          <img src="/static/images/icon-leave.png" width={50} height={50} />
        </button>
      </div>
      <CopyUrlButton roomId={roomId} lang={lang} />
    </div>
  );
};
