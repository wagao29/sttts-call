/** @jsx jsx */
import { css } from "https://deno.land/x/hono@v4.3.7/helper.ts";
import { FC, jsx } from "https://deno.land/x/hono@v4.3.7/middleware.ts";

const headerClass = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  h1 {
    font-size: var(--font-size-large);
  }
`;

export const Header: FC = () => {
  return (
    <div class={headerClass}>
      <h1>STTTS CALL</h1>
      <a href="https://github.com/wagao29/sttts-call">
        <img src="/static/images/icon-github.svg" width={40} height={40} />
      </a>
    </div>
  );
};
