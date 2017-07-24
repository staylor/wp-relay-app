import mixins from 'styles/mixins';
import buttons from 'styles/buttons';

export default {
  form: {
    margin: '0 0 20px',
  },

  content: {
    ...mixins.formField,
  },

  button: {
    ...buttons.submit,
  },

  cancel: {
    ...buttons.reset,
    margin: '0 5px',
  },
};
