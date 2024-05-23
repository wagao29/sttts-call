/** @jsx jsx */
import { css } from "https://deno.land/x/hono@v4.3.7/helper.ts";
import { FC, jsx } from "https://deno.land/x/hono@v4.3.7/middleware.ts";
import { CopyUrlButton } from "../components/CopyURLButton.tsx";
import { NameInput } from "../components/NameInput.tsx";
import { SquareButton } from "../components/SquareButton.tsx";

const formClass = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  gap: 50px;
  background-color: var(--color-gray);
  border-radius: var(--border-radius-small);
`;

const contentClass = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: var(--font-size-medium);
  gap: 20px;
`;

export const TopForm: FC<{ roomId: string }> = (props: { roomId: string }) => {
  const { roomId } = props;

  return (
    <form action={`/room/${roomId}`} method="GET" class={formClass}>
      <div class={contentClass}>
        <div>
          <span>Room ID : {roomId}</span>
          <CopyUrlButton roomId={roomId} />
        </div>
        <NameInput />
      </div>
      <SquareButton iconSrc="/static/images/icon-join.svg" labelText="JOIN" />
    </form>
  );
};
