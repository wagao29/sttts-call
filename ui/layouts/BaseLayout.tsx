import { Style } from "@hono/hono/css";
import { FC } from "@hono/hono/jsx";
import { globalStyle } from "../globalStyle.ts";
import { Header } from "../templates/Header.tsx";

export const BaseLayout: FC = (props) => {
  return (
    <html lang="en">
      <head>
        <title>STTTS CALL</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charset="UTF-8" />
        <meta
          name="description"
          content="Calling app built by connecting Speech-to-Text and Text-to-Speech."
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
