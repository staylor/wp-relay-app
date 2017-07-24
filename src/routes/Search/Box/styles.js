import colors from 'styles/colors';
import mixins, { sizeHeight } from 'styles/mixins';

export default {
  box: {
    marginBottom: 40,
  },

  input: {
    ...sizeHeight(16, 20),
    border: `1px solid ${colors.detail}`,
    display: 'block',
    padding: 8,
    width: '100%',
  },

  label: {
    ...mixins.upperHeader,
    marginBottom: 20,
  },

  a11y: {
    display: 'none',
  },
};
