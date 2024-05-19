/** @jsx jsx */
import { Style, css } from "https://deno.land/x/hono@v4.3.7/helper.ts";
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
      </head>
      <body>{props.children}</body>
    </html>
  );
};

export const Top: FC<{ roomId: string }> = (props: { roomId: string }) => {
  const { roomId } = props;

  const headerClass = css`
    background-color: gray;
    color: white;
    padding: 1rem;
  `;

  return (
    <Layout>
      <h1 class={headerClass}>sttts-call</h1>
      <div>
        <p>RoomID: {roomId}</p>
      </div>
      <form action={`/room/${roomId}`} method="GET">
        <div>
          <label for="name">Name: </label>
          <input type="text" name="name" id="name" value="" />
        </div>
        <div>
          <button>Connect</button>
        </div>
      </form>
    </Layout>
  );
};
