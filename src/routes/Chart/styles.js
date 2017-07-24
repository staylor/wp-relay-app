import mixins, { sizeHeight } from 'styles/mixins';

export default {
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

  content: {
    maxWidth: 740,
  },

  list: {
    listStyle: 'decimal',
  },

  item: {
    '&::after': { ...mixins.clear },
    display: 'list-item',
    margin: '10px 0 10px 20px',
    padding: '0 0 0 7px',
  },

  image: {
    display: 'block',
    float: 'left',
    margin: '0 10px 0 0',
  },
};
