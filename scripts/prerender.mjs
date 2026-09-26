import { createServer } from "vite";
import { readFile, writeFile } from "node:fs/promises";

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { render } = await server.ssrLoadModule("/src/render.jsx");
  const html = await readFile("dist/index.html", "utf8");
  await writeFile(
    "dist/index.html",
    html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`),
  );
} finally {
  await server.close();
}
