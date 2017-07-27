import React from 'react';
import { renderToString } from 'react-dom/server';
import { renderStatic } from 'glamor/server';
import { getFarceResult } from 'found/lib/server';
import { CookiesProvider } from 'react-cookie';
import template from 'server/template';
import { createResolver, historyMiddlewares, render, routeConfig } from 'routes';
import { ServerFetcher } from 'relay/fetcher';

export default ({ manifestJSBundle, mainJSBundle, vendorJSBundle }) => async (req, res) => {
  const graphqlUrl = 'http://localhost:3000/graphql';
  const fetcher = new ServerFetcher(graphqlUrl);

  try {
    const { redirect, element } = await getFarceResult({
      url: req.url,
      historyMiddlewares,
      routeConfig,
      resolver: createResolver(fetcher),
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
        data: fetcher,
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
