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
`;

const nameClass = css`
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: var(--font-size-small);
`;

export const ChatBox: FC<{
  id: string;
}> = (props: { id: string }) => {
  const { id } = props;

  return (
    <div class={wrapperClass} id={id}>
      <p>こんにちは</p>
      <span class={nameClass}>太郎</span>
    </div>
  );
};
