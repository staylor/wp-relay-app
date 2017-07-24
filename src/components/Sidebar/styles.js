import vars from 'styles/variables';
import colors from 'styles/colors';
import fonts from 'styles/fonts';
import mixins from 'styles/mixins';

export default {
  widget: {
    marginBottom: vars.padding * 2,
  },

  title: {
    ...mixins.upperHeader,
    marginBottom: vars.padding,
  },

  goToThis: {
    '& .title': {
      lineHeight: '1.6em',
    },

    '& a': {
      fontWeight: fonts.weightBold,
      textDecoration: 'none',
    },

    '& ol': {
      marginTop: vars.padding,
      marginBottom: vars.padding,
    },

    '& li': {
      marginTop: vars.padding / 2,
      marginBottom: vars.padding / 2,
      borderTop: `3px solid ${colors.detail}`,
    },
  },
};
