import mixins, { sizeHeight } from 'styles/mixins';

export default {
  meta: {
    ...sizeHeight(12, 18),
    clear: 'both',
    color: '#666',
    marginBottom: 10,
  },

  title: {
    ...mixins.h1,
    ...sizeHeight(36, 42),
    clear: 'both',
    fontWeight: 'bold',
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
    maxWidth: 740,

    '& h2': {
      margin: '0 0 5px',
    },

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
};
