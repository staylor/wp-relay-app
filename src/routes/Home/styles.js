import fonts from 'styles/fonts';
import mixins, { sizeHeight } from 'styles/mixins';
import colors from 'styles/colors';

export default {
  columns: {
    '&::after': { ...mixins.clear },
  },
  section: {
    marginTop: 0,
    marginRight: 0,
    marginLeft: 0,
    marginBottom: 40,
  },

  columnA: {
    float: 'left',
    marginTop: 0,
    marginRight: 16,
    marginLeft: 0,
    marginBottom: 0,
    maxWidth: 380,
    width: '38%',
  },

  columnB: {
    float: 'left',
    width: '60%',
  },

  moreIn: {
    ...sizeHeight(11, 16),
    color: colors.black,
    display: 'block',
    fontFamily: fonts.futura,
    fontWeight: fonts.weightBold,
    marginBottom: 30,
    textTransform: 'uppercase',
  },

  header: {
    ...mixins.upperHeader,
  },
};
