// const breakSmall = 320;
// const breakMedium = 360;
// const breakBig = 375;
// const breakPlus = 412;
const breakTablet = 768;
// const breakTabletpro = 1024;
const breakDesktop = 1050;
// const breakBiggest = 1200;

export default {
  contentWidth: 1080,
  padding: 16,

  mediaPhone: '',
  mediaTablet: `@media only screen and (min-width: ${breakTablet}px)`,
  mediaDesktop: `@media only screen and (min-width: ${breakDesktop}px)`,
};
