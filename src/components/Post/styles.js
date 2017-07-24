import colors from 'styles/colors';
import mixins, { sizeHeight } from 'styles/mixins';

export default {
  title: {
    ...mixins.h1,
    ...sizeHeight(18, 24),
    marginBottom: 10,

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
      marginBottom: 20,
    },
  },

  embed: {
    ...mixins.embed,
  },
};
