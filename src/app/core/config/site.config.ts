/**
 * Deployment-level settings.
 *
 * `url` must be the live absolute origin (e.g. https://abdul-rehman.vercel.app)
 * — LinkedIn, WhatsApp and X refuse relative image paths when they build a link
 * preview. Leave it empty and the tags fall back to a relative path, which still
 * works in some crawlers but not the ones that matter.
 */
export const SITE = {
  url: '',
  ogImage: 'og-image.png',
} as const;

export const absoluteUrl = (path: string): string => {
  const base = SITE.url.trim().replace(/\/+$/, '');
  return base ? `${base}/${path.replace(/^\/+/, '')}` : path;
};
