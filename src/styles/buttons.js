import colors from 'styles/colors';
import fonts from 'styles/fonts';
import { sizeHeight } from 'styles/mixins';

const button = {
  border: `1px solid ${colors.dark}`,
  cursor: 'pointer',
  display: 'inline-block',
  fontFamily: fonts.futura,
  padding: 5,
  textAlign: 'center',
  textTransform: 'uppercase',
};

const pseudo = {
  border: `1px solid ${colors.black}`,
  color: colors.black,
  outline: '0 none',
};

export default {
  button,

  submit: {
    ...button,
    backgroundColor: colors.dark,
    color: colors.white,
  },

  reset: {
    ...button,
    backgroundColor: colors.white,
    color: colors.dark,
  },

  loadMore: {
    ...sizeHeight(),
    appearance: 'none',
    background: colors.white,
    border: `1px solid ${colors.detail}`,
    boxSizing: 'border-box',
    color: '#767676',
    cursor: 'pointer',
    height: 32,
    textAlign: 'center',
    textTransform: 'uppercase',
    transition: '400ms',
    width: 80,

    ':hover': { ...pseudo },
    ':active': { ...pseudo },
    ':focus': { ...pseudo },
  },
};
