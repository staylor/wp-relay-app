import React from 'react';
import queryMiddleware from 'farce/lib/queryMiddleware';
import createRender from 'found/lib/createRender';
import makeRouteConfig from 'found/lib/makeRouteConfig';
import Route from 'found/lib/Route';
import { Resolver } from 'found-relay';
import { Environment, Network, Store } from 'relay-runtime';
import createFetch from 'relay/fetchQuery';
import App from 'components/App';
import Single from 'routes/Single';
import SingleQuery from 'queries/Single';

export const historyMiddlewares = [queryMiddleware];

export function createResolver(url, recordSource) {
  const environment = new Environment({
    network: Network.create(createFetch(url)),
    store: new Store(recordSource),
  });

  return new Resolver(environment);
}

export const routeConfig = makeRouteConfig(
  <Route path="/" Component={App}>
    <Route path="post/:id" Component={Single} query={SingleQuery} />
  </Route>
);

export const render = createRender({});
