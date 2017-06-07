import React from 'react';
import { renderToString } from 'react-dom/server';
import { getFarceResult } from 'found/lib/server';
import { RecordSource } from 'relay-runtime';
import { CookiesProvider } from 'react-cookie';

import template from 'server/template';

import { createResolver, historyMiddlewares, render, routeConfig } from 'routes';

export default ({ jsBundle, cssBundle }) => async (req, res) => {
  const graphqlUrl = 'http://localhost:3000/graphql';
  const recordSource = new RecordSource();

  getFarceResult({
    url: req.url,
    historyMiddlewares,
    routeConfig,
    resolver: createResolver(graphqlUrl, recordSource),
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
      const data = recordSource.toJSON();

      res.status(200);
      res.send(
        template({
          root,
          data,
          jsBundle,
          cssBundle,
        })
      );
    })
    .catch(e => {
      // eslint-disable-next-line no-console
      console.error(e);
      res.send(JSON.stringify(e));
    });
};
