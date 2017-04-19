import React from 'react';
import Route from 'react-router-dom';
import LoadingPage from '../components/LoadingPage';
import App from './App';
import Home from './Home';
import Single from '../containers/Single';
import Page from '../containers/Page';

/* eslint-disable react/prop-types */

const getComponent = loader => (nextState, cb) => (
  loader()
    .then(module => cb(null, module.default))
    .catch((e) => { throw e; })
);

const loadOrRender = ({ error, props, element }) => {
  if (error || props) {
    return React.cloneElement(element, props);
  }
  return <LoadingPage />;
};

const getSlug = location => location.pathname.split('/').pop();
const isYear = location => getSlug(location).match(/[0-9]{4}/);

const Routes = (
  <Route path="/" component={App}>
    <Route exact path="/" component={Home} />
    <Route path="post/:id" component={Single}
      getQueries={() => ({
        post: `query { post(id: $id) }`,
        comments: `query { comments(post: $id) }`,
      })}
      render={loadOrRender}
    />
    <Route
      path="category/:id"
      getComponent={getComponent(() => import('./Term'))}
      getQueries={() => ({
        term: `query { category(id: $id) }`,
        posts: `query { posts(categories: $id) }`,
      })}
      render={loadOrRender}
    />
    <Route
      path="tag/:id"
      getComponent={getComponent(() => import('./Term'))}
      getQueries={() => ({
        term: `query { tag(id: $id) }`,
        posts: `query { posts(tags: $id) }`,
      })}
      render={loadOrRender}
    />
    <Route
      path="author/:id"
      getComponent={getComponent(() => import('./Author'))}
      getQueries={() => ({
        author: `query { user(id: $id) }`,
        posts: `query { posts(author: $id) }`,
      })}
      render={loadOrRender}
    />
    <Route
      path=":slug"
      getComponent={getComponent(() => import('./Ambiguous'))}
      getQueries={({ location }) => {
        if (isYear(location)) {
          return {
            year: `query { posts(year: $slug) }`,
          };
        }
        return {
          page: `query { page(slug: $slug) }`,
        };
      }}
      render={loadOrRender}
    />
  </Route>
);

export default Routes;
