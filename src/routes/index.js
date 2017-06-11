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
      path="category/:id"
      getComponent={getComponent(() => /* webpackChunkName: "category" */ import('./Category'))}
      query={CategoryQuery}
    />
    <Route
      path="tag/:id"
      getComponent={getComponent(() => /* webpackChunkName: "tag" */ import('./Tag'))}
      query={TagQuery}
    />
    <Route
      path="post/:id"
      getComponent={getComponent(() => /* webpackChunkName: "single" */ import('./Single'))}
      query={SingleQuery}
    />
    <Route
      path=":slug"
      getComponent={getComponent(() => /* webpackChunkName: "page" */ import('./Page'))}
      query={PageQuery}
    />
    <Route
      getComponent={getComponent(() => /* webpackChunkName: "home" */ import('./Home'))}
      query={HomeQuery}
      prepareVariables={params => ({
        ...params,
        stickiesTotal: 2,
        readThisID: 'Q2F0ZWdvcnk6Mw==',
        readThisTotal: 5,
        watchThisID: 'Q2F0ZWdvcnk6NA==',
        watchThisTotal: 5,
        listenToThisID: 'Q2F0ZWdvcnk6NQ==',
        listenToThisTotal: 5,
      })}
    />
  </Route>
);

export const render = createRender({});
