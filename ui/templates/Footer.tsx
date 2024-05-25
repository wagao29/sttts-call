/** @jsx jsx */
import { css } from "https://deno.land/x/hono@v4.3.7/helper.ts";
import { FC, jsx } from "https://deno.land/x/hono@v4.3.7/middleware.ts";
import { CopyUrlButton } from "../components/CopyUrlButton.tsx";

const footerClass = css`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: var(--font-size-small);
    width: 200px;
    text-align: center;
  }
`;

const buttonWrapperClass = css`
  display: flex;
  gap: 60px;
  align-items: center;
`;

export const Footer: FC<{ roomId: string }> = (props: { roomId: string }) => {
  const { roomId } = props;

  return (
    <div class={footerClass}>
      <span>Room ID : {roomId}</span>
      <div class={buttonWrapperClass}>
        <button id="speak-btn">
          <img src="/static/images/icon-mute.png" width={50} height={50} />
        </button>
        <button id="leave-btn">
          <img src="/static/images/icon-leave.png" width={50} height={50} />
        </button>
      </div>
      <CopyUrlButton roomId={roomId} />
    </div>
  );
};
