import vars from 'styles/variables';
import { sizeHeight } from 'styles/mixins';
import fonts from 'styles/fonts';
import colors from 'styles/colors';

export const globals = {
  body: {
    ...sizeHeight(13, 18),
    background: colors.background,
    color: colors.dark,
    fontFamily: fonts.body,
    paddingRight: vars.padding,
    paddingLeft: vars.padding,
    textRendering: 'optimizeLegibility',
  },

  iframe: {
    maxWidth: '100%',
  },

  a: {
    color: colors.pink,
  },

  blockquote: {
    marginRight: vars.padding,
    marginLeft: vars.padding,
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
    backgroundColor: colors.white,
    borderTop: '2px solid #bbb',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: vars.contentWidth,
    paddingRight: vars.padding,
    paddingLeft: vars.padding,
  },

  content: {
    paddingTop: vars.padding,
    paddingBottom: vars.padding,
    [vars.mediaDesktop]: {
      display: 'flex',
      marginRight: vars.padding,
    },
  },

  primary: {
    [vars.mediaDesktop]: {
      flex: 4,
    },
  },

  secondary: {
    display: 'block',
    minHeight: 212,
    minWidth: 212,
    [vars.mediaDesktop]: {
      flex: 1,
    },
  },

  footerCredits: {
    paddingTop: vars.padding,
    paddingBottom: vars.padding,
    textAlign: 'center',
  },
};
