import mixins, { sizeHeight } from 'styles/mixins';

export default {
  title: {
    ...mixins.h1,
    ...sizeHeight(18, 24),
    clear: 'both',
    margin: '0 0 10px',

    '& a': {
      color: '#222',
      textDecoration: 'none',
    },
  },

  paragraph: {
    margin: '0 0 20px',
  },

  image: {
    display: 'block',
    maxWidth: '100%',
  },

  content: {
    '& p': {
      margin: '0 0 20px',
    },
  },

  footer: {
    '& a': {
      display: 'inline-block',
      margin: '0 0 0 5px',
    },
  },

  embed: {
    ...mixins.embed,
  },
};
