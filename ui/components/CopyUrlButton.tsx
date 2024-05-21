/** @jsx jsx */
import { css, html } from "https://deno.land/x/hono@v4.3.7/helper.ts";
import {
  FC,
  Fragment,
  jsx,
} from "https://deno.land/x/hono@v4.3.7/middleware.ts";

const btnClass = css`
  width: 200px;
  display: flex;
  align-items: center;
  border-radius: var(--border-radius-small);
  padding: 3px 0;

  &:active {
    background-color: var(--color-dark-gray);
  }
`;

const labelClass = css`
  flex: 1;
  text-align: center;
  font-size: var(--font-size-small);
  color: var(--color-blue);
`;

export const CopyUrlButton: FC<{
  url: string;
}> = (props: { url: string }) => {
  const { url } = props;

  return (
    <Fragment>
      <button type="button" class={btnClass} onclick="copyUrl()">
        <img width={30} height={30} src="/static/images/icon-copy.png"></img>
        <span class={labelClass}>Copy Room URL</span>
      </button>
      {html`
        <script>
          function copyUrl() {
            navigator.clipboard.writeText("${url}");
          }
        </script>
      `}
    </Fragment>
  );
};
