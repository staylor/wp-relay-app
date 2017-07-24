import colors from 'styles/colors';
import vars from 'styles/variables';
import { sizeHeight } from 'styles/mixins';

const submenuWidth = 168;

export default {
  access: {
    display: 'block',
    marginBottom: vars.padding / 2,
    marginTop: vars.padding / 2,

    '& ul': {
      listStyle: 'none',
      marginLeft: -1 * (vars.padding / 2),

      '& ul': {
        display: 'none',
        left: vars.padding,
        position: 'absolute',
        top: vars.padding * 1.5,
        width: submenuWidth + vars.padding * 2,
        zIndex: 99999,
        [vars.mediaDesktop]: {
          top: vars.padding * 2,
        },

        '& a': {
          ...sizeHeight(13, 20),
          background: colors.subnavBackground,
          borderBottom: `1px dotted ${colors.subnavDetail}`,
          paddingTop: vars.padding / 2,
          paddingBottom: vars.padding / 2,
          paddingLeft: vars.padding,
          paddingRight: vars.padding,
          width: submenuWidth,
        },

        '& ul': {
          left: '100%',
          top: 0,
        },
      },
    },

    '& li': {
      position: 'relative',
    },

    '& a': {
      ...sizeHeight(14, vars.padding * 1.5),
      color: colors.black,
      display: 'block',
      paddingLeft: vars.padding * 0.75,
      paddingRight: vars.padding * 0.75,
      textDecoration: 'none',
      textTransform: 'uppercase',
      [vars.mediaDesktop]: {
        ...sizeHeight(14, vars.padding * 2),
        paddingLeft: vars.padding,
        paddingRight: vars.padding,
      },
    },

    '& li:hover > a': {
      background: colors.subnavHoverBackground,
    },
    '& ul ul :hover > a': {
      background: colors.subnavHoverBackground,
    },
    '& a:focus': {
      background: colors.subnavHoverBackground,
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
