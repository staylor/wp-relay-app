import colors from 'styles/colors';
import mixins, { sizeHeight } from 'styles/mixins';
import vars from 'styles/variables';

export default {
  header: {
    background: colors.white,
    borderTop: '2px solid #bbb',
    maxWidth: vars.contentWidth,
    paddingTop: vars.padding * 1.5,
    position: 'relative',
    width: '100%',
    zIndex: 9999,
  },

  siteTitle: {
    ...mixins.h1,
    ...sizeHeight(48, 72),
    color: colors.black,
    fontWeight: 'bold',

    '& a': {
      color: colors.black,
      textDecoration: 'none',
    },
    [vars.mediaTablet]: {
      ...sizeHeight(56, 72),
    },
  },

  siteDescription: {
    ...mixins.subhead,
    ...sizeHeight(18, 18),
    color: colors.meta,
    position: 'absolute',
    left: 0,
    top: vars.padding / 2,
    [vars.mediaTablet]: {
      ...sizeHeight(24, 24),
      left: 'auto',
      right: vars.padding * 2,
      top: vars.padding * 3.5,
    },
  },
};
