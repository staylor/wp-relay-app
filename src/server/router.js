import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { IntlProvider } from 'react-intl';
import template from './template';
import Routes from '../routes';

export default ({
  jsBundle,
  cssBundle,
}) => (
  (req, res) => {
    const context = {};
    const root = renderToString((
      <IntlProvider locale="en">
        <StaticRouter
          location={req.url}
          context={context}
        >
          <Routes />
        </StaticRouter>
      </IntlProvider>
    ));

    res.status(200);
    res.send(template({
      root,
      jsBundle,
      cssBundle,
      data,
    }));
  }
);
