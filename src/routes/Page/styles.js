import fonts from 'styles/fonts';
import mixins, { sizeHeight } from 'styles/mixins';
import vars from 'styles/variables';

export default {
  title: {
    ...mixins.h1,
    ...sizeHeight(36, 42),
    fontWeight: fonts.weightBold,
    marginBottom: vars.padding / 2,
  },

  content: {
    maxWidth: 740,

    '& h2': {
      marginBottom: vars.padding / 2,
    },

    '& p': {
      marginBottom: vars.padding,
    },
  },
};
