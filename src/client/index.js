import React from 'react';
import ReactDOM from 'react-dom';
import BrowserProtocol from 'farce/lib/BrowserProtocol';
import createInitialFarceRouter from 'found/lib/createInitialFarceRouter';
import { CookiesProvider } from 'react-cookie';
import { rehydrate } from 'glamor';
import { historyMiddlewares, render, routeConfig } from 'routes';
import { resolver } from 'relay/environment';

(async () => {
  // eslint-disable-next-line no-underscore-dangle
  rehydrate(window._glam);

  try {
    const Router = await createInitialFarceRouter({
      historyProtocol: new BrowserProtocol(),
      historyMiddlewares,
      historyOptions: { useBeforeUnload: true },
      routeConfig,
      resolver,
      render,
    });
    ReactDOM.hydrate(
      <CookiesProvider>
        <Router resolver={resolver} />
      </CookiesProvider>,
      document.getElementById('main')
    );
  } catch (e) {
    throw e;
  }
})();
