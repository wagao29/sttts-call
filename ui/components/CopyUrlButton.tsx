import { css } from "@hono/hono/css";
import { html } from "@hono/hono/html";
import { FC, Fragment } from "@hono/hono/jsx";
import { LangCode } from "../../constants.ts";

const btnClass = css`
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: var(--border-radius-small);
  padding: 5px;

  &:active {
    background-color: var(--color-gray);
  }
`;

const labelClass = css`
  flex: 1;
  text-align: center;
  font-size: var(--font-size-small);
  color: var(--color-blue);
`;

type Props = {
  roomId: string;
  lang: LangCode;
};

export const CopyUrlButton: FC<Props> = (props: Props) => {
  const { roomId, lang } = props;

  return (
    <Fragment>
      <button type="button" class={btnClass} onclick="copyUrl()">
        <img width={30} height={30} src="/static/images/icon-copy.png"></img>
        <span class={labelClass}>Copy Room URL</span>
      </button>
      {html`
        <script>
          function copyUrl() {
            navigator.clipboard.writeText(
              \`\${location.protocol}://\${location.host}/?room_id=${roomId}&lang=${lang}\`
            );
          }
        </script>
      `}
    </Fragment>
  );
};
