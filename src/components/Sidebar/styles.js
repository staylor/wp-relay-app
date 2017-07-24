import colors from 'styles/colors';
import mixins from 'styles/mixins';

export default {
  widget: {
    margin: '0 0 24px',
  },

  title: {
    ...mixins.upperHeader,
    margin: '0 0 16px',
  },

  goToThis: {
    '& .title': {
      lineHeight: '1.6em',
    },

    '& a': {
      fontWeight: 700,
      textDecoration: 'none',
    },

    '& ol': {
      margin: '16px 0',
    },

    '& li': {
      padding: '8px 0',
      borderTop: `3px solid ${colors.detail}`,
    },
  },
};
