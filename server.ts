import cors from "cors";
import express, { json } from "express";
import { readFile } from "fs/promises";
import { Transform } from "stream";
import { ViteDevServer } from "vite";
import { authMiddleware } from "./server/auth/authMiddleware";
import { crudMiddleware } from "./server/logic/crud-middleware";
import { endpoints } from "./server/logic/endpoints";

((app) => {
  app.listen(80, async () => {

    const isProduction = process.env.NODE_ENV === "production";
    const base = process.env.BASE || "/";
    const ABORT_DELAY = 10000;

    const templateHtml = isProduction
      ? await readFile("./dist/client/index.html", "utf-8")
      : "";
    const ssrManifest = isProduction
      ? await readFile("./dist/client/.vite/ssr-manifest.json", "utf-8")
      : undefined;

    let vite: ViteDevServer;
    if (!isProduction) {
      const { createServer } = await import("vite");
      vite = await createServer({
        server: { middlewareMode: true },
        appType: "custom",
        base,
      });
      app.use(vite.middlewares);
    } else {
      const compression = (await import("compression")).default;
      const sirv = (await import("sirv")).default;
      app.use(compression());
      app.use(base, sirv("./dist/client", { extensions: [] }));
    }

    app
      .use(json())
      .set("trust proxy", "linklocal")
      .use(cors())
      .use("/api/auth", authMiddleware)
      .use("/api/crud", crudMiddleware(endpoints));
   
    app.get("/", async (req, res) => {
      try {
        const url = req.originalUrl.replace(base, "");

        let template: string;
        let render: (
          arg0: string,
          arg1: string | undefined,
          arg2: {
            onShellError(): void;
            onShellReady(): void;
            onError(error: any): void;
          }
        ) => { pipe: any; abort: any };
        if (!isProduction) {
          template = await readFile("./index.html", "utf-8");
          template = await vite.transformIndexHtml(url, template);
          render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
        } else {
          template = templateHtml;
          render = (await import("./src/entry-server")).render;
        }

        let didError = false;

        const { pipe, abort } = render(url, ssrManifest, {
          onShellError() {
            res.status(500);
            res.set({ "Content-Type": "text/html" });
            res.send("<h1>Something went wrong</h1>");
          },
          onShellReady() {
            res.status(didError ? 500 : 200);
            res.set({ "Content-Type": "text/html" });

            const transformStream = new Transform({
              transform(chunk, encoding, callback) {
                res.write(chunk, encoding);
                callback();
              },
            });

            const [htmlStart, htmlEnd] = template.split(`<!--app-html-->`);

            res.write(htmlStart);

            transformStream.on("finish", () => {
              res.end(htmlEnd);
            });

            pipe(transformStream);
          },
          onError(error: any) {
            didError = true;
            console.error(error);
          },
        });

        setTimeout(() => {
          abort();
        }, ABORT_DELAY);
      } catch (e: any) {
        vite?.ssrFixStacktrace(e);
        console.log(e.stack);
        res.status(500).end(e.stack);
      }
    });
  });
})(express());
