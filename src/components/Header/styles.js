import colors from 'styles/colors';
import mixins, { sizeHeight } from 'styles/mixins';
import vars from 'styles/variables';

export default {
  header: {
    '&::after': { ...mixins.clear },
    background: colors.white,
    borderTop: '2px solid #bbb',
    maxWidth: vars.contentWidth,
    position: 'relative',
    width: '100%',
    zIndex: 9999,

    '& hgroup': {
      overflow: 'hidden',
    },
  },

  siteTitle: {
    ...mixins.h1,
    ...sizeHeight(48, 72),
    color: colors.black,
    float: 'left',
    fontWeight: 'bold',
    padding: '2.6% 0 0',

    '& a': {
      color: colors.black,
      textDecoration: 'none',
    },
  },

  siteDescription: {
    ...mixins.subhead,
    ...sizeHeight(24, 24),
    bottom: '40%',
    color: '#7a7a7a',
    position: 'absolute',
    right: 32,
  },
};
