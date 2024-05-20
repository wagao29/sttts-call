/** @jsx jsx */
import { Style, css } from "https://deno.land/x/hono@v4.3.7/helper.ts";
import { FC, jsx } from "https://deno.land/x/hono@v4.3.7/middleware.ts";

export const BaseLayout: FC = (props) => {
  return (
    <html>
      <head>
        <title>sttts-call</title>
        <Style>{css`
          :root {
            --color-gray: #3c4042;
            --color-dark-gray: #202123;
            --color-red: #fe453a;
            --color-green: #6ee764;
            --color-blue: #1a6ddd;
          }
          html {
            font-family: Arial, Helvetica, sans-serif;
          }
          body {
            margin: 0;
            background-color: var(--color-dark-gray);
            color: #fff;
          }
        `}</Style>
      </head>
      <body>{props.children}</body>
    </html>
  );
};
