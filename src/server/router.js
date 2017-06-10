import React from 'react';
import { renderToString } from 'react-dom/server';
import { getFarceResult } from 'found/lib/server';
import { CookiesProvider } from 'react-cookie';
import template from 'server/template';
import { createResolver, historyMiddlewares, render, routeConfig } from 'routes';
import { ServerFetcher } from 'relay/fetcher';

export default ({ manifestJSBundle, mainJSBundle, vendorJSBundle, mainCSSBundle }) => async (
  req,
  res
) => {
  const graphqlUrl = 'http://localhost:3000/graphql';
  const fetcher = new ServerFetcher(graphqlUrl);

  getFarceResult({
    url: req.url,
    historyMiddlewares,
    routeConfig,
    resolver: createResolver(fetcher),
    render,
  })
    .then(({ redirect, element }) => {
      if (redirect) {
        res.redirect(302, redirect.url);
        return;
      }

      const root = renderToString(
        <CookiesProvider cookies={req.universalCookies}>
          {element}
        </CookiesProvider>
      );

      res.status(200);
      res.send(
        template({
          root,
          data: fetcher,
          manifestJSBundle,
          mainJSBundle,
          vendorJSBundle,
          mainCSSBundle,
        })
      );
    })
    .catch(e => {
      // eslint-disable-next-line no-console
      console.error(e);
      res.send(e.message);
    });
};
