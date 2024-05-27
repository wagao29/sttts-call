/** @jsx jsx */
import { css } from "https://deno.land/x/hono@v4.3.7/helper.ts";
import { FC, jsx } from "https://deno.land/x/hono@v4.3.7/middleware.ts";

const headerClass = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    text-decoration: none;
  }

  h1 {
    font-size: var(--font-size-large);
    color: #fff;
  }
`;

export const Header: FC = () => {
  return (
    <div class={headerClass}>
      <a href="/">
        <h1>STTTS CALL</h1>
      </a>
      <a
        href="https://github.com/wagao29/sttts-call"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/static/images/icon-github.svg" width={40} height={40} />
      </a>
    </div>
  );
};
