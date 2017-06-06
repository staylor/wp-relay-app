import React from 'react';
import ReactDOM from 'react-dom';
import BrowserProtocol from 'farce/lib/BrowserProtocol';
import createInitialFarceRouter from 'found/lib/createInitialFarceRouter';
import { RecordSource } from 'relay-runtime';
import { CookiesProvider } from 'react-cookie';
import { createResolver, historyMiddlewares, render, routeConfig } from 'routes';

(async () => {
  // eslint-disable-next-line no-underscore-dangle
  const recordSource = new RecordSource(window.__RELAY_STORE__);
  const resolver = createResolver('/graphql', recordSource);

  const Router = await createInitialFarceRouter({
    historyProtocol: new BrowserProtocol(),
    historyMiddlewares,
    routeConfig,
    resolver,
    render,
  });

  ReactDOM.render(
    <CookiesProvider><Router resolver={resolver} /></CookiesProvider>,
    document.getElementById('main')
  );
})();
