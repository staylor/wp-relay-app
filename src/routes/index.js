import React from 'react';
import queryMiddleware from 'farce/lib/queryMiddleware';
import createRender from 'found/lib/createRender';
import makeRouteConfig from 'found/lib/makeRouteConfig';
import Route from 'found/lib/Route';
import { Resolver } from 'found-relay';
import { Environment, Network, Store } from 'relay-runtime';
import 'isomorphic-fetch';
import App from 'components/App';
import Single from 'routes/Single';
import SingleQuery from 'queries/Single';
import Category from 'routes/Category';
import CategoryQuery from 'queries/Category';
import Tag from 'routes/Tag';
import TagQuery from 'queries/Tag';
import Home from 'routes/Home';
import HomeQuery from 'queries/Home';
import Page from 'routes/Page';
import PageQuery from 'queries/Page';
import AppQuery from 'queries/App';
import createFetch from 'relay/fetchQuery';

export const historyMiddlewares = [queryMiddleware];

export function createResolver(url, recordSource) {
  const environment = new Environment({
    network: Network.create(createFetch(url)),
    store: new Store(recordSource),
  });

  return new Resolver(environment);
}

export const routeConfig = makeRouteConfig(
  <Route
    path="/"
    Component={App}
    query={AppQuery}
    prepareVariables={params => ({
      ...params,
      menuID: 'TmF2TWVudToy',
      sidebarID: 'U2lkZWJhcjpzaWRlYmFyLTE=',
    })}
  >
    <Route path="category/:id" Component={Category} query={CategoryQuery} />
    <Route path="tag/:id" Component={Tag} query={TagQuery} />
    <Route path="post/:id" Component={Single} query={SingleQuery} />
    <Route path=":id" Component={Page} query={PageQuery} />
    <Route
      Component={Home}
      query={HomeQuery}
      prepareVariables={params => ({
        ...params,
        readThisID: 'Q2F0ZWdvcnk6Mw==',
        watchThisID: 'Q2F0ZWdvcnk6NA==',
        listenToThisID: 'Q2F0ZWdvcnk6NQ==',
      })}
    />
  </Route>
);

export const render = createRender({});
