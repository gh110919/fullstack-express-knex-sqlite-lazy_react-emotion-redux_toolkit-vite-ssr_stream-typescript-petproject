import {
  renderToPipeableStream,
  renderToString,
  type RenderToPipeableStreamOptions,
} from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { content } from "./entry-client.tsx";
import { writeFileSync } from "fs";

export function render(
  _url: string,
  _ssrManifest?: string,
  options?: RenderToPipeableStreamOptions
) {
  /*  */
  writeFileSync(
    "render.html",
    renderToString(
      <StaticRouter location={_url}>{content}</StaticRouter>,
      options
    ),
    "utf-8"
  );
  /*  */
  return renderToPipeableStream(
    <StaticRouter location={_url}>{content}</StaticRouter>,
    options
  );
}
