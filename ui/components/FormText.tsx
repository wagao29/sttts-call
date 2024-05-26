/** @jsx jsx */
import { css } from "https://deno.land/x/hono@v4.3.7/helper.ts";
import { FC, jsx } from "https://deno.land/x/hono@v4.3.7/middleware.ts";

const wrapperClass = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--font-size-medium);
  width: 100%;
`;

const valueWrapperClass = css`
  flex-grow: 1;
  text-align: center;
`;

export const FormText: FC<{ label: string; value: string }> = (props: {
  label: string;
  value: string;
}) => {
  const { label, value } = props;

  return (
    <div class={wrapperClass}>
      <span>{label}</span>
      <div class={valueWrapperClass}>
        <span>{value}</span>
      </div>
    </div>
  );
};