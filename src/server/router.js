import React from 'react';
import { renderToString } from 'react-dom/server';
import { renderStatic } from 'glamor/server';
import { getFarceResult } from 'found/lib/server';
import { CookiesProvider } from 'react-cookie';
import { resolver } from 'relay/environment';
import { getRequestCache } from 'relay/fetcher';
import template from 'server/template';
import { historyMiddlewares, render, routeConfig } from 'routes';

export default ({ manifestJSBundle, mainJSBundle, vendorJSBundle }) => async (req, res) => {
  try {
    const { redirect, element } = await getFarceResult({
      url: req.url,
      historyMiddlewares,
      routeConfig,
      resolver,
      render,
    });

    if (redirect) {
      res.redirect(302, redirect.url);
      return;
    }

    const { html, css, ids } = renderStatic(() =>
      renderToString(
        <CookiesProvider cookies={req.universalCookies}>
          {element}
        </CookiesProvider>
      )
    );

    res.status(200);
    res.send(
      template({
        root: html,
        data: getRequestCache(),
        css,
        ids,
        manifestJSBundle,
        mainJSBundle,
        vendorJSBundle,
      })
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    res.send(e.message);
  }
};
