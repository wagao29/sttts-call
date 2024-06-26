import { css } from "@hono/hono/css";
import { FC } from "@hono/hono/jsx";
import { LANGUAGE_LIST, LangCode } from "../../constants.ts";

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

type Props = {
  defaultLang: LangCode;
};

export const LanguageSelect: FC<Props> = (props: Props) => {
  const { defaultLang } = props;

  return (
    <div class={wrapperClass}>
      <label for="lang">Language</label>
      <div>
        <select name="lang" id="lang">
          {Object.entries(LANGUAGE_LIST).map(([langValue, langText]) => (
            <option value={langValue} selected={defaultLang === langValue}>
              {langText}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
