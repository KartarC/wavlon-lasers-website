// Match Vercel's existing trailingSlash:false policy for absolute page URLs.
// Leave the homepage, asset URLs, external hosts and relative navigation intact.
export function normalizeSiteUrls(text) {
  return text.replace(/https:\/\/wavlonlasers\.com\/[^\s"'<>`\\?#]*/g, (url) =>
    url === 'https://wavlonlasers.com/' ? url : url.replace(/\/+$/, '')
  );
}
