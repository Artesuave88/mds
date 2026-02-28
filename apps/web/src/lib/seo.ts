type MetaInput = {
  title: string;
  description: string;
  image?: string;
  url?: string;
};

type MetaOutput = {
  title: string;
  description: string;
  image: string;
  url: string;
  siteName: string;
};

const SITE_NAME = "Midas Web Development";
const DEFAULT_IMAGE = "/brand/logo-full.png";
const DEFAULT_BASE = "http://localhost:5173";

function resolveBaseUrl() {
  const raw = (import.meta.env.VITE_SITE_URL as string | undefined)?.trim();

  if (!raw) {
    return DEFAULT_BASE;
  }

  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    const url = new URL(withProtocol);
    return url.origin;
  } catch {
    return DEFAULT_BASE;
  }
}

function toAbsolute(pathOrUrl: string, baseUrl: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  const normalizedPath = pathOrUrl.startsWith("/")
    ? pathOrUrl
    : `/${pathOrUrl}`;
  return new URL(normalizedPath, `${baseUrl}/`).toString();
}

export function setMeta({
  title,
  description,
  image = DEFAULT_IMAGE,
  url = "/",
}: MetaInput): MetaOutput {
  const baseUrl = resolveBaseUrl();
  const computedTitle =
    title === SITE_NAME ? SITE_NAME : `${title} | ${SITE_NAME}`;

  return {
    title: computedTitle,
    description,
    image: toAbsolute(image, baseUrl),
    url: toAbsolute(url, baseUrl),
    siteName: SITE_NAME,
  };
}
