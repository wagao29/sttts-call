/** @jsx jsx */
import { css } from "https://deno.land/x/hono@v4.3.7/helper.ts";
import {
  FC,
  Fragment,
  jsx,
} from "https://deno.land/x/hono@v4.3.7/middleware.ts";
import { FormText } from "../components/FormText.tsx";
import { LanguageSelect } from "../components/LanguageSelect.tsx";
import { NameInput } from "../components/NameInput.tsx";
import { SquareButton } from "../components/SquareButton.tsx";

const formClass = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 60px;
`;

const contentClass = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;
  font-size: var(--font-size-medium);
  gap: 40px;
`;

export const TopForm: FC<{
  roomId: string;
  defaultLang: string;
  lang?: string;
}> = (props: { roomId: string; defaultLang: string; lang?: string }) => {
  const { roomId, defaultLang, lang } = props;

  return (
    <form action={`/room/${roomId}`} method="GET" class={formClass}>
      <div class={contentClass}>
        <FormText label="Room ID" value={roomId} />
        {lang ? (
          <Fragment>
            <FormText label="Language" value={lang} />
            <input type="hidden" name="lang" value={lang} />
          </Fragment>
        ) : (
          <LanguageSelect defaultLang={defaultLang} />
        )}
        <NameInput />
      </div>
      <SquareButton iconSrc="/static/images/icon-join.svg" labelText="JOIN" />
    </form>
  );
};
