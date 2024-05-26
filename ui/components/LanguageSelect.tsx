/** @jsx jsx */
import { css } from "https://deno.land/x/hono@v4.3.7/helper.ts";
import { FC, jsx } from "https://deno.land/x/hono@v4.3.7/middleware.ts";
import { LANGUAGE_LIST } from "../../constants.ts";

const wrapperClass = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--font-size-medium);
  width: 100%;

  select {
    width: 350px;
    height: 50px;
    text-align: center;
    font-size: var(--font-size-small);
  }
`;

export const LanguageSelect: FC = () => {
  return (
    <div class={wrapperClass}>
      <label for="lang">Language</label>
      <div>
        <select name="lang" id="lang">
          {Object.entries(LANGUAGE_LIST).map(([langValue, langText]) => (
            <option value={langValue}>{langText}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
