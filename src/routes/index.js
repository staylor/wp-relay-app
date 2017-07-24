import 'isomorphic-fetch';
import React from 'react';
import queryMiddleware from 'farce/lib/queryMiddleware';
import createRender from 'found/lib/createRender';
import makeRouteConfig from 'found/lib/makeRouteConfig';
import Route from 'found/lib/Route';
import { Resolver } from 'found-relay';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import Loading from 'components/Loading';
import AppQuery from 'queries/App';
import HomeQuery from 'queries/Home';
import SingleQuery from 'queries/Single';
import ChartQuery from 'queries/Chart';
import DateQuery from 'queries/Date';
import PageQuery from 'queries/Page';
import SearchQuery from 'queries/Search';
import TermQuery from 'queries/Term';

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

/* eslint-disable global-require */

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
      getComponent={getComponent(() => /* webpackChunkName: "term" */ import('./Term'))}
      query={TermQuery}
      render={renderProp}
      prepareVariables={params => ({
        ...params,
        taxonomy: 'category',
      })}
    />
    <Route
      path="tag/:slug"
      getComponent={getComponent(() => /* webpackChunkName: "term" */ import('./Term'))}
      query={TermQuery}
      render={renderProp}
      prepareVariables={params => ({
        ...params,
        taxonomy: 'tag',
      })}
    />
    <Route
      path=":year(\d+)/:month(\d+)/:day(\d+)/:id"
      getComponent={getComponent(() => /* webpackChunkName: "single" */ import('./Single'))}
      query={SingleQuery}
      render={renderProp}
    />
    <Route
      path=":year(\d+)/:month(\d+)?/:day(\d+)?"
      getComponent={getComponent(() => /* webpackChunkName: "date" */ import('./Date'))}
      query={DateQuery}
      prepareVariables={params => {
        const vars = Object.assign({}, params);
        return ['year', 'month', 'day'].reduce((memo, value) => {
          if (vars[value]) {
            memo[value] = parseInt(vars[value], 10);
          }
          return memo;
        }, {});
      }}
    />
    <Route
      path="search"
      getComponent={getComponent(() => /* webpackChunkName: "search" */ import('./Search'))}
      query={SearchQuery}
      render={renderProp}
    />
    <Route
      path="charts"
      getComponent={getComponent(() => /* webpackChunkName: "chart" */ import('./Chart'))}
      query={ChartQuery}
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
