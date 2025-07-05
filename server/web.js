import { Hono } from "@hono";
import { html, raw } from "@hono/html";
import { serveStatic } from "@hono/deno";

const app = new Hono();

app.use("*", serveStatic({ root: "./web" }));

const files = [];
try {
  for await (const dirEntry of Deno.readDir("./web/x")) {
    if (dirEntry.isFile) {
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
                <feColorMatrix type="saturate" values="0" result="desat" />
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
              <filter id="invert">
                <feColorMatrix
                  in="SourceGraphic"
                  type="matrix"
                  values="-1 0 0 0 1
                      0 -1 0 0 1
                      0 0 -1 0 1
                      0 0 0 1 0"
                />
              </filter>
              <filter id="wavy">
                <feTurbulence
                  id="turbulence"
                  type="turbulence"
                  numOctaves="50"
                  result="NOISE"
                ></feTurbulence>
                <feDisplacementMap
                  id="displacement"
                  in="SourceGraphic"
                  in2="NOISE"
                  scale="0"
                >
                  <animate
                    id="controller"
                    attributeName="scale"
                    begin="indefinite"
                    type="scale"
                    dur="8s"
                    from="0"
                    repeatCount="1"
                    fill="freeze"
                    to="500"
                  />
                </feDisplacementMap>
                <animate
                  xlink:href="#turbulence"
                  attributeName="baseFrequency"
                  dur="60s"
                  keyTimes="0;0.5;1"
                  values="0.01 0.02;0.02 0.04;0.01 0.02"
                  repeatCount="indefinite"
                ></animate>
              </filter>
            </defs>
          </svg>
          <goo-tube index="0"><goo-bg></goo-bg></goo-tube>
          <goo-flash></goo-flash>
        </figure>
        <goo-cycle></goo-cycle>
        <goo-grid></goo-grid>
      </body>
    </html>
  `));

function serveWeb() {
  console.log("🕸️: Web listening");
  Deno.serve({ port: 3333 }, app.fetch);
}

export default serveWeb;
