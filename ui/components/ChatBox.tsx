import { css } from "@hono/hono/css";
import { FC } from "@hono/hono/jsx";

const wrapperClass = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const chatBoxClass = css`
  width: 80%;
  height: 80%;
  max-width: 600px;
  max-height: 300px;

  position: relative;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-small);
  background-color: var(--color-gray);
  font-size: var(--font-size-small);

  span {
    position: absolute;
    bottom: 10px;
    left: 10px;
    font-size: var(--font-size-small);
  }
`;

export const ChatBox: FC = () => {
  return (
    <div class={wrapperClass} id="chat-box">
      <div class={chatBoxClass}>
        <p class="chat-box-msg"></p>
        <span class="chat-box-name"></span>
      </div>
    </div>
  );
};
