/** @jsx jsx */
import { Style } from "https://deno.land/x/hono@v4.3.7/helper.ts";
import { FC, jsx } from "https://deno.land/x/hono@v4.3.7/middleware.ts";
import { globalStyle } from "../globalStyle.ts";
import { Header } from "../templates/Header.tsx";

export const BaseLayout: FC = (props) => {
  return (
    <html>
      <head>
        <title>STTTS CALL</title>
        <Style>{globalStyle}</Style>
      </head>
      <body>
        <Header />
        {props.children}
      </body>
    </html>
  );
};
