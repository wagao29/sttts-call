import { html } from "@hono/hono/html";
import { FC } from "@hono/hono/jsx";

export const HtmlLayout: FC = (props) => {
  return html`<!DOCTYPE html>
    <html lang="en">
      ${props.children}
    </html>`;
};
