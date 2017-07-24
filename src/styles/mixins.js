import colors from 'styles/colors';
import fonts from 'styles/fonts';

export function sizeHeight(size = 16, height = 1) {
  return {
    fontSize: [`${size}px`, `${size / 16}rem`],
    lineHeight: [height === 1 ? 1 : `${height}px`, `${height / 16}rem`],
  };
}

const autofill = {
  boxShadow: `0 0 0 1000px ${colors.white} inset`,
  color: colors.dark,
  transition: `background-color 5000s ease-in-out 0s`,
};

export default {
  clear: {
    clear: 'both',
    content: '.',
    display: 'block',
    height: 0,
    visibility: 'hidden',
  },

  h1: {
    ...sizeHeight(32, 40),
    fontFamily: fonts.futura,
  },

  // h2
  subhead: {
    ...sizeHeight(24, 32),
    fontFamily: fonts.futura,
  },

  // h3
  upperHeader: {
    ...sizeHeight(18, 24),
    fontFamily: fonts.futura,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  formField: {
    border: `1px solid ${colors.detail}`,
    margin: 0,
    padding: 6,
    width: '100%',

    ':-webkit-autofill': { ...autofill },
    ':-webkit-autofill:hover': { ...autofill },
    ':-webkit-autofill:focus': { ...autofill },
    ':-webkit-autofill:active': { ...autofill },
  },

  embed: {
    cursor: 'pointer',
    display: 'inline-block',
    height: 'auto !important',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 20,
    marginLeft: 0,
    maxWidth: '100%',
    position: 'relative',

    '& figcaption': {
      display: 'none',
    },

    '& img': {
      height: 'auto',
      maxWidth: '100%',
      position: 'relative',
      zIndex: 1,
    },

    '::before': {
      background: colors.pink,
      borderRadius: 10,
      content: '" "',
      height: 52,
      left: '50%',
      marginTop: -21,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: -48,
      opacity: 0.8,
      position: 'absolute',
      top: '50%',
      width: 76,
      zIndex: 2,
    },

    '::after': {
      borderBottom: '10px solid transparent',
      borderLeft: `20px solid ${colors.white}`,
      borderTop: '10px solid transparent',
      content: '" "',
      height: 0,
      left: 'calc(50% + 31px)',
      marginTop: -21,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: -48,
      position: 'absolute',
      // top: 16px;
      top: 'calc(50% + 16px)',
      width: 0,
      zIndex: 3,
    },

    ':hover': {
      '::before': {
        background: colors.black,
      },
    },
  },
};
