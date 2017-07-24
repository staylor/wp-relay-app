import vars from 'styles/variables';
import mixins, { sizeHeight } from 'styles/mixins';
import fonts from 'styles/fonts';
import colors from 'styles/colors';

export const globals = {
  body: {
    ...sizeHeight(13, 18),
    background: '#e2e2e2',
    color: colors.dark,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    padding: '0 2em',
    textRendering: 'optimizeLegibility',
  },

  iframe: {
    maxWidth: '100%',
  },

  a: {
    color: colors.pink,
  },
  blockquote: {
    marginTop: 0,
    marginRight: 20,
    marginBottom: 0,
    marginLeft: 20,
  },
  em: {
    textDecoration: 'underline',
  },
  strong: {
    fontWeight: fonts.weightBold,
  },
};

export default {
  page: {
    background: colors.white,
    margin: '0 auto',
    maxWidth: vars.contentWidth,
    padding: '0 16px',
  },

  content: {
    '&::after': { ...mixins.clear },
    padding: '16px 0',
  },

  primary: {
    float: 'left',
    width: '78%',
  },

  secondary: {
    float: 'right',
    width: '20%',
  },

  footerCredits: {
    padding: '16px 0',
    textAlign: 'center',
  },
};
