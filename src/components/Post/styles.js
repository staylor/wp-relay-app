import colors from 'styles/colors';
import mixins, { sizeHeight } from 'styles/mixins';
import vars from 'styles/variables';

export default {
  post: {
    marginBottom: vars.padding,
  },

  title: {
    ...mixins.h1,
    ...sizeHeight(18, 24),
    marginBottom: vars.padding / 2,

    '& a': {
      color: colors.subheading,
      textDecoration: 'none',
    },
  },

  image: {
    display: 'block',
    maxWidth: '100%',
  },

  content: {
    '& p': {
      marginBottom: vars.padding,
    },
  },

  embed: {
    ...mixins.embed,
  },
};
