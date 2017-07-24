import colors from 'styles/colors';
import mixins, { sizeHeight } from 'styles/mixins';

export default {
  access: {
    display: 'block',
    float: 'left',
    margin: '0 auto 6px',
    width: '100%',

    '& ul': {
      '&::after': { ...mixins.clear },

      ...sizeHeight(14, 14),
      listStyle: 'none',
      margin: '0 0 0 -1em',
      paddingLeft: 0,

      '& ul': {
        display: 'none',
        float: 'left',
        left: 14,
        margin: 0,
        position: 'absolute',
        top: 28,
        width: 188,
        zIndex: 99999,

        '& a': {
          ...sizeHeight(13, 20),
          background: '#f9f9f9',
          borderBottom: '1px dotted #ddd',
          color: '#444',
          fontWeight: 'normal',
          height: 'auto',
          padding: 10,
          width: 168,
        },

        '& ul': {
          left: '100%',
          top: 0,
        },
      },
    },

    '& li': {
      float: 'left',
      position: 'relative',
    },

    '& a': {
      color: colors.black,
      display: 'block',
      lineHeight: '2em',
      padding: '0 1.2125em',
      textDecoration: 'none',
      textTransform: 'uppercase',
    },

    '& li:hover > a': {
      background: '#efefef',
      color: '#373737',
    },
    '& ul ul :hover > a': {
      background: '#efefef',
    },
    '& a:focus': {
      background: '#efefef',
      color: '#373737',
    },

    '& ul li:hover > ul': {
      display: 'block',
    },
  },

  navItem: {
    display: 'inline-block',
  },

  activeLink: {
    color: colors.black,
    textDecoration: 'none',
  },
};
