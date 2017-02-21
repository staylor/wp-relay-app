export const convertPlaceholders = (html, styles) => (
  html
    .replace(/hft-oembed-placeholder/g, styles.placeholder)
    .replace(/"arrow"/g, `"${styles.arrow}"`)
);
