import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const webRoot = path.resolve(__dirname, "..");
const staticDir = path.join(webRoot, "static");
const projectsPath = path.join(webRoot, "src", "content", "projects.json");

function resolveBaseUrl() {
  const raw = process.env.VITE_SITE_URL?.trim();

  if (!raw) {
    return "http://localhost:5173";
  }

  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    return new URL(withProtocol).origin;
  } catch {
    return "http://localhost:5173";
  }
}

function toAbsolute(pathname, baseUrl) {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(normalized, `${baseUrl}/`).toString();
}

const baseUrl = resolveBaseUrl();

const staticRoutes = ["/", "/about", "/contact", "/services", "/work"];

const projects = JSON.parse(await readFile(projectsPath, "utf8"));
const projectRoutes = projects.map((project) => `/work/${project.slug}`);

const routes = [...new Set([...staticRoutes, ...projectRoutes])];

const now = new Date().toISOString();

const sitemapEntries = routes
  .map((route) => {
    const priority = route === "/" ? "1.0" : route.startsWith("/work/") ? "0.7" : "0.8";
    const changefreq = route === "/" ? "weekly" : "monthly";

    return [
      "  <url>",
      `    <loc>${toAbsolute(route, baseUrl)}</loc>`,
      `    <lastmod>${now}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      "  </url>"
    ].join("\n");
  })
  .join("\n");

const sitemapXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  sitemapEntries,
  "</urlset>",
  ""
].join("\n");

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  "",
  `Sitemap: ${toAbsolute("/sitemap.xml", baseUrl)}`,
  ""
].join("\n");

await mkdir(staticDir, { recursive: true });
await writeFile(path.join(staticDir, "sitemap.xml"), sitemapXml, "utf8");
await writeFile(path.join(staticDir, "robots.txt"), robotsTxt, "utf8");

console.info(`[seo] Generated sitemap.xml and robots.txt for ${baseUrl}`);
