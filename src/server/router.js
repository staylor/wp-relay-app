import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { IntlProvider } from 'react-intl';
import template from 'server/template';
import App from 'components/App';

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
          <App />
        </StaticRouter>
      </IntlProvider>
    ));

    res.status(200);
    res.send(template({
      root,
      jsBundle,
      cssBundle,
    }));
  }
);
