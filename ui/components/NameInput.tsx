/** @jsx jsx */
import { css } from "https://deno.land/x/hono@v4.3.7/helper.ts";
import { FC, jsx } from "https://deno.land/x/hono@v4.3.7/middleware.ts";
import { MAX_NAME_LENGTH } from "../../constants.ts";

const wrapperClass = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: var(--font-size-medium);

  input {
    height: 50px;
    font-size: var(--font-size-medium);
    text-align: center;
  }
`;

export const NameInput: FC = () => {
  return (
    <div class={wrapperClass}>
      <label for="name">Name : </label>
      <input
        type="text"
        name="name"
        id="name"
        maxlength={MAX_NAME_LENGTH}
        required
      />
    </div>
  );
};
