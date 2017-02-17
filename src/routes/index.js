
import React from 'react';
import Relay from 'react-relay';
import { Route, IndexRoute } from 'react-router';
import App from './App';

// Webpack 2 supports ES2015 `System.import` by auto-
// chunking assets. Check out the following for more:
// https://gist.github.com/sokra/27b24881210b56bbaff7#code-splitting-with-es6

const importHome = (nextState, cb) => {
  System.import('./Home')
    .then(module => cb(null, module.default))
    .catch((e) => { throw e; });
};

const importPost = (nextState, cb) => {
  System.import('./Post')
    .then(module => cb(null, module.default))
    .catch((e) => { throw e; });
};

const importTools = (nextState, cb) => {
  System.import('./Tools')
    .then(module => cb(null, module.default))
    .catch((e) => { throw e; });
};

// We use `getComponent` to dynamically load routes.
// https://github.com/reactjs/react-router/blob/master/docs/guides/DynamicRouting.md
const routes = (
  <Route path="/" component={App}>
    <IndexRoute
      getComponent={importHome}
      queries={{
        stickies: () => Relay.QL`query { stickies }`,
        posts: () => Relay.QL`query { posts }`,
      }}
    />
    <Route
      path="post/:id"
      getComponent={importPost}
      queries={{ post: () => Relay.QL`query { post(id: $id) }` }}
    />
    <Route path="tools" getComponent={importTools} />
  </Route>
);

// Unfortunately, HMR breaks when we dynamically resolve
// routes so we need to require them here as a workaround.
// https://github.com/gaearon/react-hot-loader/issues/288
if (module.hot) {
  require('./Home');    // eslint-disable-line global-require
  require('./Tools');   // eslint-disable-line global-require
  require('./Post');   // eslint-disable-line global-require
}

export default routes;
