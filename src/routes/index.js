import React from 'react';
import Relay from 'react-relay';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import LoadingPage from 'components/LoadingPage';
import App from './App';

/* eslint-disable react/prop-types */

// Webpack 2 supports ES2015 `System.import` by auto-
// chunking assets. Check out the following for more:
// https://gist.github.com/sokra/27b24881210b56bbaff7#code-splitting-with-es6

const importHome = (nextState, cb) => {
  System.import('./Home')
    .then(module => cb(null, module.default))
    .catch((e) => { throw e; });
};

const importSingle = (nextState, cb) => {
  System.import('./Single')
    .then(module => cb(null, module.default))
    .catch((e) => { throw e; });
};

const importTerm = (nextState, cb) => {
  System.import('./Term')
    .then(module => cb(null, module.default))
    .catch((e) => { throw e; });
};

const importAuthor = (nextState, cb) => {
  System.import('./Author')
    .then(module => cb(null, module.default))
    .catch((e) => { throw e; });
};

const importPosts = (nextState, cb) => {
  System.import('./Posts')
    .then(module => cb(null, module.default))
    .catch((e) => { throw e; });
};

const loadOrRender = ({ error, props, element }) => {
  if (error || props) {
    return React.cloneElement(element, props);
  }
  return <LoadingPage />;
};

// We use `getComponent` to dynamically load routes.
// https://github.com/reactjs/react-router/blob/master/docs/guides/DynamicRouting.md
const routes = (
  <Route
    path="/"
    component={App}
    getQueries={() => ({
      navMenu: () => Relay.QL`query { navMenu(id: "TmF2TWVudToy") }`,
      sidebar: () => Relay.QL`query { sidebar(id: "U2lkZWJhcjpzaWRlYmFyLTE=") }`,
    })}
  >
    <IndexRoute
      getComponent={importHome}
      getQueries={() => ({
        stickies: () => Relay.QL`query { stickies }`,
        readThis: () => Relay.QL`query { posts(categories: "Q2F0ZWdvcnk6Mw==") }`,
        watchThis: () => Relay.QL`query { posts(categories: "Q2F0ZWdvcnk6NA==") }`,
        listenToThis: () => Relay.QL`query { posts(categories: "Q2F0ZWdvcnk6NQ==") }`,
      })}
      render={loadOrRender}
    />
    <Route
      path="post/:id"
      getComponent={importSingle}
      getQueries={({ location }) => ({
        post: () => (location.state ?
          Relay.QL`query { node(id: $id) }` :
          Relay.QL`query { post(id: $id) }`),
        comments: () => Relay.QL`query { comments(post: $id) }`,
      })}
      render={loadOrRender}
    />
    <Route
      path="category/:id"
      getComponent={importTerm}
      getQueries={({ location }) => ({
        term: () => (location.state ?
          Relay.QL`query { node(id: $id) }` :
          Relay.QL`query { category(id: $id) }`),
        posts: () => Relay.QL`query { posts(categories: $id) }`,
      })}
      render={loadOrRender}
    />
    <Route
      path="tag/:id"
      getComponent={importTerm}
      getQueries={({ location }) => ({
        term: () => (location.state ?
          Relay.QL`query { node(id: $id) }` :
          Relay.QL`query { tag(id: $id) }`),
        posts: () => Relay.QL`query { posts(tags: $id) }`,
      })}
      render={loadOrRender}
    />
    <Route
      path="author/:id"
      getComponent={importAuthor}
      getQueries={({ location }) => ({
        author: () => (location.state ?
          Relay.QL`query { node(id: $id) }` :
          Relay.QL`query { user(id: $id) }`),
        posts: () => Relay.QL`query { posts(author: $id) }`,
      })}
      render={loadOrRender}
    />
    <Route
      path=":slug"
      getComponent={importPosts}
      getQueries={({ location }) => {
        const slug = location.pathname.split('/').pop();
        // no regex allowed in paths, so we must do it here
        if (slug.match(/[0-9]{4}/)) {
          return {
            posts: () => Relay.QL`query { posts(year: $slug) }`,
          };
        }
        return {
          page: () => Relay.QL`query { page(slug: $slug) }`,
        };
      }}
      render={loadOrRender}
    />
  </Route>
);

export default routes;
