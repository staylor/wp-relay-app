import vars from 'styles/variables';
import mixins from 'styles/mixins';

export default {
  header: {
    ...mixins.upperHeader,
  },

  comments: {
    marginTop: vars.padding * 3,
    maxWidth: '100%',
    [vars.mediaTablet]: {
      width: 450,
    },
  },
};
