/** @jsx jsx */
import { css } from "https://deno.land/x/hono@v4.3.7/helper.ts";
import { FC, jsx } from "https://deno.land/x/hono@v4.3.7/middleware.ts";
import { BaseLayout } from "../layouts/BaseLayout.tsx";

const wrapperClass = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const titleClass = css`
  font-size: var(--font-size-large);
`;

const messageClass = css`
  font-size: var(--font-size-small);
`;

type Props = {
  message: string;
};

export const Error: FC<Props> = (props: Props) => {
  const { message } = props;

  return (
    <BaseLayout>
      <div class={wrapperClass}>
        <p class={titleClass}>ERROR</p>
        <p class={messageClass}>{message}</p>
      </div>
    </BaseLayout>
  );
};
