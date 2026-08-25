export type MetaInput = {
  title: string;
  description: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  image?: string;
  url?: string;
  includeSiteName?: boolean;
};

export type MetaOutput = {
  title: string;
  description: string;
  openGraphTitle: string;
  openGraphDescription: string;
  image: string;
  canonicalUrl: string;
  siteName: string;
  twitterCard: 'summary_large_image';
};

const SITE_NAME = 'Midas Web Development';
const TITLE_SUFFIX = 'Midas Web';
const DEFAULT_IMAGE = '/brand/logo-full.png';
const DEFAULT_BASE = 'http://localhost:5173';

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

  const normalizedPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return new URL(normalizedPath, `${baseUrl}/`).toString();
}

export function setMeta({
  title,
  description,
  openGraphTitle,
  openGraphDescription,
  image = DEFAULT_IMAGE,
  url = '/',
  includeSiteName = true,
}: MetaInput): MetaOutput {
  const baseUrl = resolveBaseUrl();
  const computedTitle = includeSiteName ? `${title} | ${TITLE_SUFFIX}` : title;

  return {
    title: computedTitle,
    description,
    openGraphTitle: openGraphTitle ?? computedTitle,
    openGraphDescription: openGraphDescription ?? description,
    image: toAbsolute(image, baseUrl),
    canonicalUrl: toAbsolute(url, baseUrl),
    siteName: SITE_NAME,
    twitterCard: 'summary_large_image',
  };
}
