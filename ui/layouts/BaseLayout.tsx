import { Style } from "@hono/hono/css";
import { FC } from "@hono/hono/jsx";
import { globalStyle } from "../globalStyle.ts";
import { Header } from "../templates/Header.tsx";
import { HtmlLayout } from "./HtmlLayout.tsx";

export const BaseLayout: FC = (props) => {
  return (
    <HtmlLayout>
      <head>
        <title>STTTS CALL</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charset="UTF-8" />
        <meta
          name="description"
          content="Calling app built by connecting Speech-to-Text and Text-to-Speech."
        />
        <link rel="icon" href="/static/images/favicon.png" />
        <link
          rel="apple-touch-icon"
          href="/static/images/apple-touch-icon.png"
        />
        <Style>{globalStyle}</Style>
      </head>
      <body>
        <Header />
        {props.children}
      </body>
    </HtmlLayout>
  );
};
