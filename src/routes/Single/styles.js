import colors from 'styles/colors';
import fonts from 'styles/fonts';
import mixins, { sizeHeight } from 'styles/mixins';
import vars from 'styles/variables';

export default {
  meta: {
    ...sizeHeight(12, 18),
    color: colors.meta,
    marginBottom: vars.padding,
  },

  title: {
    ...mixins.h1,
    ...sizeHeight(24, 30),
    fontWeight: 'bold',
    marginBottom: vars.padding,

    '& a': {
      color: colors.dark,
      textDecoration: 'none',
    },

    [vars.mediaTablet]: {
      ...sizeHeight(36, 42),
    },
  },

  content: {
    maxWidth: 740,

    '& h2': {
      ...mixins.subhead,
      fontWeight: fonts.weightBold,
      marginBottom: vars.padding / 2,
    },

    '& p': {
      marginBottom: vars.padding,
    },
  },

  tag: {
    display: 'inline-block',
    marginLeft: vars.padding / 4,
  },
};
