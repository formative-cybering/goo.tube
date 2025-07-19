import { Hono } from "@hono";
import { html, raw } from "@hono/html";
import { serveStatic } from "@hono/deno";

const app = new Hono();

app.use("*", serveStatic({ root: "./web" }));

const files = [];
try {
  for await (const dirEntry of Deno.readDir("./web/x")) {
    if (dirEntry.isFile && !dirEntry.name.startsWith(".")) {
      files.push(dirEntry.name);
    }
  }
} catch (_e) {
  console.log("NO FILES");
}

console.log(files);

app.get("*", (c) =>
  c.html(html`
    <html>
      <head>
        <title>GooTube</title>
        <link rel="stylesheet" href="/style.css" />
        <script>
        window.X_FILES = ${raw(JSON.stringify(files))};
        </script>
        <script type="module" src="/goo.js" defer></script>
      </head>
      <body>
        <figure>
          <svg width="100%" height="100%">
            <defs>
              <filter id="high-contrast-filter">
                <feComponentTransfer>
                  <feFuncR
                    type="discrete"
                    tableValues="1 0.8 0.5 0 0 0 0 0 0 0 0 0 0 0 .8 .9 1"
                  />
                  <feFuncG
                    type="discrete"
                    tableValues="1 0.8 0.5 0 0 0 0 0 0 0 0 0 0 0 .8 .9 1"
                  />
                  <feFuncB
                    type="discrete"
                    tableValues="1 0.8 0.5 0 0 0 0 0 0 0 0 0 0 0 .8 .9 1"
                  />
                </feComponentTransfer>
              </filter>
            </defs>
          </svg>
          <goo-tube index="0"><goo-bg></goo-bg></goo-tube>
          <goo-flash></goo-flash>
        </figure>
        <goo-cycle>GooTube</goo-cycle>
        <goo-info>Send OSC messages on port 1111 and open up your browser console</goo-info>
        <goo-grid></goo-grid>
      </body>
    </html>
  `));

function serveWeb() {
  console.log("🕸️: Web listening");
  Deno.serve({ port: 3333 }, app.fetch);
}

export default serveWeb;
