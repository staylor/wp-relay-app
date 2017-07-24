import buttons from 'styles/buttons';
import fonts from 'styles/fonts';
import mixins, { sizeHeight } from 'styles/mixins';

export default {
  form: {
    margin: '20px 0 40px',
    width: 300,

    '& p': {
      margin: '5px 0',
    },

    '& label': {
      ...sizeHeight(16, 20),
      display: 'block',
      fontFamily: fonts.futura,
    },

    '& input[type="text"]': {
      ...mixins.formField,
    },

    '& input[type="email"]': {
      ...mixins.formField,
    },

    '& input[type="url"]': {
      ...mixins.formField,
    },

    '& textarea': {
      ...mixins.formField,
    },
  },

  button: {
    ...buttons.submit,
    ...sizeHeight(16, 20),
    padding: 8,
    width: 80,
  },

  reset: {
    ...buttons.reset,
    ...sizeHeight(16, 20),
    margin: '0 10px',
    padding: 8,
  },
};
