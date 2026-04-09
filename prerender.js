import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "dist");

const routes = [
  "/",
  "/about",
  "/contact",
  "/pricing",
  "/reviews",
  "/trades",
  "/terms",
  "/privacy",
  "/onboarding-form",
  "/services/functional-website",
  "/services/missed-call-text-back",
  "/services/all-in-one-inbox",
  "/services/business-phone",
  "/services/local-seo",
  "/services/review-funnel",
  "/services/one-click-campaigns",
  "/services/automated-follow-up",
];

async function prerender() {
  const template = fs.readFileSync(path.resolve(distDir, "index.html"), "utf-8");
  const { render } = await import("./dist/server/entry-server.js");

  for (const route of routes) {
    const { html, helmet } = render(route);

    let page = template;

    // Replace <title> with page-specific title from Helmet
    if (helmet?.title) {
      const titleStr = helmet.title.toString();
      if (titleStr) {
        page = page.replace(/<title>[^<]*<\/title>/, titleStr);
      }
    }

    // Inject page-specific meta tags from Helmet before </head>
    const metaTags = [
      helmet?.meta?.toString(),
      helmet?.link?.toString(),
      helmet?.script?.toString(),
    ]
      .filter(Boolean)
      .join("\n");

    if (metaTags) {
      page = page.replace("</head>", `${metaTags}\n</head>`);
    }

    // Inject rendered HTML into root div
    page = page.replace('<div id="root"></div>', `<div id="root">${html}</div>`);

    // Write to file
    const filePath =
      route === "/"
        ? path.resolve(distDir, "index.html")
        : path.resolve(distDir, `${route.slice(1)}/index.html`);

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, page);

    console.log(`  Prerendered: ${route}`);
  }

  // Clean up server bundle — not needed in deployment
  fs.rmSync(path.resolve(distDir, "server"), { recursive: true, force: true });

  console.log(`\nDone — ${routes.length} pages prerendered.`);
}

prerender().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
