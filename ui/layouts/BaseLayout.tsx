import { Style } from "@hono/hono/css";
import { FC } from "@hono/hono/jsx";
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
