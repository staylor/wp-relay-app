// eslint-disable-next-line import/prefer-default-export
export const convertPlaceholders = (html, styles) =>
  html
    .replace(/hft-oembed-placeholder/g, styles.placeholder)
    .replace(/"arrow"/g, `"${styles.arrow}"`);
