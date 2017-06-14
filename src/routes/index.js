import React from 'react';
import queryMiddleware from 'farce/lib/queryMiddleware';
import createRender from 'found/lib/createRender';
import makeRouteConfig from 'found/lib/makeRouteConfig';
import Route from 'found/lib/Route';
import { Resolver } from 'found-relay';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import 'isomorphic-fetch';
import SingleQuery from 'queries/Single';
import CategoryQuery from 'queries/Category';
import TagQuery from 'queries/Tag';
import HomeQuery from 'queries/Home';
import PageQuery from 'queries/Page';
import AppQuery from 'queries/App';
import SearchQuery from 'queries/Search';
import Loading from 'components/Loading';

const getComponent = loader => (location, cb) =>
  loader().then(module => module.default).catch(error => {
    // eslint-disable-next-line no-console
    console.error(error);
    cb(error, null);
  });

export const historyMiddlewares = [queryMiddleware];

export function createResolver(fetcher) {
  const environment = new Environment({
    network: Network.create((...args) => fetcher.fetch(...args)),
    store: new Store(new RecordSource()),
  });

  return new Resolver(environment);
}

// eslint-disable-next-line
const renderProp = ({ Component, props }) =>
  Component && props ? <Component {...props} /> : <Loading />;

export const routeConfig = makeRouteConfig(
  <Route
    path="/"
    getComponent={getComponent(() => /* webpackChunkName: "app" */ import('../components/App'))}
    query={AppQuery}
    prepareVariables={params => ({
      ...params,
      menuID: 'TmF2TWVudToy',
      sidebarID: 'U2lkZWJhcjpzaWRlYmFyLTE=',
    })}
  >
    <Route
      path="music/:slug"
      getComponent={getComponent(() => /* webpackChunkName: "category" */ import('./Category'))}
      query={CategoryQuery}
      render={renderProp}
    />
    <Route
      path="tag/:slug"
      getComponent={getComponent(() => /* webpackChunkName: "tag" */ import('./Tag'))}
      query={TagQuery}
      render={renderProp}
    />
    <Route
      path="post/:id"
      getComponent={getComponent(() => /* webpackChunkName: "single" */ import('./Single'))}
      query={SingleQuery}
      render={renderProp}
    />
    <Route
      path="search"
      getComponent={getComponent(() => /* webpackChunkName: "search" */ import('./Search'))}
      query={SearchQuery}
      render={renderProp}
    />
    <Route
      path=":slug"
      getComponent={getComponent(() => /* webpackChunkName: "page" */ import('./Page'))}
      query={PageQuery}
      render={renderProp}
    />
    <Route
      getComponent={getComponent(() => /* webpackChunkName: "home" */ import('./Home'))}
      query={HomeQuery}
      render={renderProp}
    />
  </Route>
);

export const render = createRender({});
