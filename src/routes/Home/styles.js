import vars from 'styles/variables';
import fonts from 'styles/fonts';
import mixins, { sizeHeight } from 'styles/mixins';
import colors from 'styles/colors';

export default {
  columns: {
    [vars.mediaTablet]: {
      display: 'flex',
      marginRight: vars.padding,
    },
  },

  section: {
    marginBottom: 40,
  },

  columnA: {
    [vars.mediaTablet]: {
      flex: 1,
      marginRight: vars.padding,
    },
  },

  columnB: {
    [vars.mediaTablet]: {
      flex: 2,
    },
  },

  moreIn: {
    ...sizeHeight(11, 16),
    color: colors.black,
    display: 'block',
    fontFamily: fonts.futura,
    fontWeight: fonts.weightBold,
    marginBottom: vars.padding * 2,
    textTransform: 'uppercase',
  },

  header: {
    ...mixins.upperHeader,
  },
};
