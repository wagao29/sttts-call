/** @jsx jsx */
import { css } from "https://deno.land/x/hono@v4.3.7/helper.ts";
import { FC, jsx } from "https://deno.land/x/hono@v4.3.7/middleware.ts";
import { SquareButton } from "../components/SquareButton.tsx";
import { BaseLayout } from "../layouts/BaseLayout.tsx";

export const Top: FC<{ roomId: string }> = (props: { roomId: string }) => {
  const { roomId } = props;

  const headerClass = css`
    padding: 10px;
  `;

  return (
    <BaseLayout>
      <h1 class={headerClass}>STTTS CALL</h1>
      <div>
        <p>RoomID: {roomId}</p>
      </div>
      <form action={`/room/${roomId}`} method="GET">
        <div>
          <label for="name">Name: </label>
          <input type="text" name="name" id="name" value="" />
        </div>
        <div>
          <SquareButton
            iconSrc="/static/images/icon-join.svg"
            labelText="JOIN"
          />
        </div>
      </form>
    </BaseLayout>
  );
};
