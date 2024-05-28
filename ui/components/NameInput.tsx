import { css } from "@hono/hono/css";
import { FC } from "@hono/hono/jsx";
import { MAX_NAME_LENGTH } from "../../constants.ts";

const wrapperClass = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--font-size-medium);
  width: 100%;

  input {
    width: 350px;
    height: 50px;
    text-align: center;
    font-size: var(--font-size-small);
  }
`;

export const NameInput: FC = () => {
  return (
    <div class={wrapperClass}>
      <label for="name">Name</label>
      <div>
        <input
          type="text"
          name="name"
          id="name"
          maxlength={MAX_NAME_LENGTH}
          required
        />
      </div>
    </div>
  );
};
