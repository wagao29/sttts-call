/** @jsx jsx */
import { Style, css, html } from "https://deno.land/x/hono@v4.3.7/helper.ts";
import { FC, jsx } from "https://deno.land/x/hono@v4.3.7/middleware.ts";

const Layout: FC = (props) => {
  return (
    <html>
      <head>
        <title>sttts-call</title>
        <Style>{css`
          html {
            font-family: Arial, Helvetica, sans-serif;
          }
          body {
            margin: 0;
          }
        `}</Style>
        {html` <script type="module" src="/static/client.js"></script> `}
      </head>
      <body>{props.children}</body>
    </html>
  );
};

export const Room: FC<{ name: string }> = (props: { name: string }) => {
  const { name } = props;

  const headerClass = css`
    background-color: gray;
    color: white;
    padding: 1rem;
  `;

  return (
    <Layout>
      <h1 class={headerClass}>sttts-call</h1>
      <p>Name: {name}</p>
      <button id="speak-btn">speak</button>
      <div id="output"></div>
    </Layout>
  );
};
