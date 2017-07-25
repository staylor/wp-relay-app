import mixins from 'styles/mixins';
import vars from 'styles/variables';

export default {
  sections: {
    maxWidth: 740,
  },

  label: {
    ...mixins.upperHeader,
    marginBottom: vars.padding * 2,
  },
};
