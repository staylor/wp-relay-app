const getComponent = loader => (nextState, cb) => (
  loader()
    .then(module => cb(null, module.default))
    .catch((e) => { throw e; })
);

export default loader => ({ error, props }) => {
  if (error) {
    console.log(error.message);
    return null;
  } else if (props) {
    return <NavMenu {...props} />;
  }
  return null;
};
