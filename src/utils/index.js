export const convertPlaceholders = (html, styles) => {
  let modules = html
    .replace(/hft-oembed-placeholder/g, styles.placeholder)
    .replace(/"arrow"/g, `"${styles.arrow}"`);

  if (typeof window === 'undefined') {
    modules = modules
      .replace(/(<iframe )/g, '<!--$1')
      .replace(/(<\/iframe>)/g, '$1-->');
  }
  return modules;
};
