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
  "/demo",
  "/how-it-works",
  "/terms",
  "/terms-of-service",
  "/privacy",
  "/privacy-policy",
  "/onboarding-form",
  "/sms-optin",
  "/services/functional-website",
  "/services/missed-call-text-back",
  "/services/business-phone",
  "/services/local-seo",
  "/services/review-funnel",
  "/services/one-click-campaigns",
  "/services/automated-follow-up",
  "/services/ai-receptionist",
];

const DEFAULT_TITLE = "VargaFlow — Marketing Systems for Contractors";
const DEFAULT_DESCRIPTION = "Done-for-you marketing systems for home service contractors. Websites, automations, lead generation, and review funnels — built so you can stay on the job site.";

// Static <head> tags in index.html that must not survive alongside the
// per-route versions injected below — previously these were only ever
// APPENDED to (never removed from) the template, so every prerendered page
// shipped two <meta name="description"> tags (and og:title/og:description/
// twitter:title/twitter:description/canonical/og:url were never overridden
// at all). Crawlers and link-preview scrapers take the first matching tag,
// so the stale homepage-generic one silently won on every non-home page.
const STATIC_TAGS_TO_REPLACE = [
  /<title>[^<]*<\/title>\n?/,
  /<meta name="description"[^>]*>\n?/,
  /<link rel="canonical"[^>]*>\n?/,
  /<meta property="og:url"[^>]*>\n?/,
  /<meta property="og:title"[^>]*>\n?/,
  /<meta name="twitter:title"[^>]*>\n?/,
  /<meta property="og:description"[^>]*>\n?/,
  /<meta name="twitter:description"[^>]*>\n?/,
];

// react-helmet-async's .toString() output is already HTML-escaped text —
// safe to lift back out and reuse inside a new attribute as long as we also
// escape the one character (") that's legal unescaped in element text but
// not inside an attribute value.
const escapeForAttr = (s) => s.replace(/"/g, "&quot;");

async function prerender() {
  const template = fs.readFileSync(path.resolve(distDir, "index.html"), "utf-8");
  const { render } = await import("./dist/server/entry-server.js");

  for (const route of routes) {
    const { html, helmet } = render(route);

    let page = template;
    for (const pattern of STATIC_TAGS_TO_REPLACE) {
      page = page.replace(pattern, "");
    }

    const titleMatch = (helmet?.title?.toString() ?? "").match(/<title[^>]*>([\s\S]*?)<\/title>/);
    const titleHtml = titleMatch ? titleMatch[1] : DEFAULT_TITLE;

    const metaHtml = helmet?.meta?.toString() ?? "";
    const descMatch = metaHtml.match(/name="description" content="([\s\S]*?)"/);
    const descHtml = descMatch ? descMatch[1] : DEFAULT_DESCRIPTION;

    const canonicalUrl = route === "/" ? "https://vargaflow.com/" : `https://vargaflow.com${route}`;

    // Rebuild title/canonical/og/twitter fresh per route, then append whatever
    // else the page's own <Helmet> set (its description tag lands here too —
    // fine, it's the only description tag now that the static one is gone).
    const headInjection = [
      `<title>${titleHtml}</title>`,
      `<link rel="canonical" href="${canonicalUrl}">`,
      `<meta property="og:url" content="${canonicalUrl}">`,
      `<meta property="og:title" content="${escapeForAttr(titleHtml)}">`,
      `<meta name="twitter:title" content="${escapeForAttr(titleHtml)}">`,
      `<meta property="og:description" content="${escapeForAttr(descHtml)}">`,
      `<meta name="twitter:description" content="${escapeForAttr(descHtml)}">`,
      metaHtml,
      helmet?.link?.toString(),
      helmet?.script?.toString(),
    ]
      .filter(Boolean)
      .join("\n");

    page = page.replace("</head>", `${headInjection}\n</head>`);

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
