/** @jsx jsx */
import { Style } from "https://deno.land/x/hono@v4.3.7/helper.ts";
import { FC, jsx } from "https://deno.land/x/hono@v4.3.7/middleware.ts";
import { globalStyle } from "../globalStyle.ts";
import { Header } from "../templates/Header.tsx";

export const BaseLayout: FC = (props) => {
  return (
    <html lang="en">
      <head>
        <title>STTTS CALL</title>
        <meta charset="utf-8" />
        <meta
          name="description"
          content="Call by SpeechToText and TextToSpeech"
        />
        <link rel="icon" href="/static/images/favicon.png" />
        <Style>{globalStyle}</Style>
      </head>
      <body>
        <Header />
        {props.children}
      </body>
    </html>
  );
};
