import { css } from "@hono/hono/css";

export const globalStyle = css`
  :root {
    --color-gray: #3c4042;
    --color-dark-gray: #202123;
    --color-red: #fe453a;
    --color-green: #6ee764;
    --color-blue: #1a6ddd;

    --font-size-small: 20px;
    --font-size-medium: 25px;
    --font-size-large: 30px;

    --border-radius-small: 5px;
    --border-radius-medium: 10px;
  }
  html {
    font-family: Arial, Helvetica, sans-serif;
  }
  body {
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
    background-color: var(--color-dark-gray);
    color: #fff;
    width: 100%;
    height: 100vh;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  h1,
  h2,
  p,
  ul,
  li {
    margin: 0;
    padding: 0;
    line-height: 1;
  }

  button {
    background-color: transparent;
    color: #fff;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    appearance: none;
  }
`;
