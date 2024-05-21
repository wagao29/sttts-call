/** @jsx jsx */
import { css } from "https://deno.land/x/hono@v4.3.7/helper.ts";
import { FC, jsx } from "https://deno.land/x/hono@v4.3.7/middleware.ts";

const btnClass = css`
  padding: 10px;
  width: 200px;
  background-color: var(--color-green);
  border-radius: var(--border-radius-small);
  display: flex;
  align-items: center;
`;

const labelClass = css`
  flex: 1;
  text-align: center;
  font-size: var(--font-size-small);
`;

export const SquareButton: FC<{
  iconSrc: string;
  labelText: string;
}> = (props: { iconSrc: string; labelText: string }) => {
  const { iconSrc, labelText } = props;

  return (
    <button class={btnClass}>
      <img width={30} height={30} src={iconSrc}></img>
      <span class={labelClass}>{labelText}</span>
    </button>
  );
};
