// eslint-disable-next-line import/prefer-default-export
export const convertPlaceholders = (html, styles) => html.replace(/"embed"/g, `"${styles.embed}"`);
