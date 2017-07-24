import colors from 'styles/colors';
import mixins, { sizeHeight } from 'styles/mixins';

export default {
  comment: {
    borderBottom: `1px solid ${colors.detail}`,
    position: 'relative',
  },

  image: {
    float: 'left',
    margin: '0 10px 10px 0',
  },

  meta: {
    '&::after': { ...mixins.clear },
  },

  author: {
    display: 'block',
    textTransform: 'uppercase',

    '& a': {
      color: colors.dark,
    },
  },

  time: {
    display: 'block',
  },

  content: {
    '& p': {
      ...sizeHeight(12, 15),
    },
  },

  reply: {
    ...sizeHeight(16, 20),
    background: 'none',
    border: 0,
    cursor: 'pointer',
    padding: 0,
    position: 'absolute',
    right: 0,
    top: 0,

    '&:active': {
      outline: '0 none',
    },
    '&:focus': {
      outline: '0 none',
    },
  },

  active: {
    color: colors.pink,
  },

  actions: {
    margin: '5px 0',
  },

  edit: {
    background: 'transparent',
    border: `1px solid ${colors.detail}`,
    cursor: 'pointer',
    transition: '600ms',

    '&:hover': {
      border: `1px solid ${colors.dark}`,
    },

    '&:active': {
      outline: '0 none',
    },
    '&:focus': {
      outline: '0 none',
    },
  },

  deletion: {
    background: 'transparent',
    border: '0 none',
    color: colors.pink,
    cursor: 'pointer',
    margin: '0 5px',

    '&:hover': {
      textDecoration: 'underline',
    },
  },

  elapsed: {
    fontStyle: 'italic',
  },
};
