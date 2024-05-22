/** @jsx jsx */
import { css } from "https://deno.land/x/hono@v4.3.7/helper.ts";
import { FC, jsx } from "https://deno.land/x/hono@v4.3.7/middleware.ts";

const wrapperClass = css`
  position: relative;
  height: 250px;
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
      <p class="chat-box-msg"></p>
      <span class="chat-box-name"></span>
    </div>
  );
};
