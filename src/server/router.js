// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import { StaticRouter } from 'react-router';
// import { IntlProvider } from 'react-intl';
// import App from 'components/App';
import template from 'server/template';

// const renderTree = (req, context) => (
//   renderToString(
//     <IntlProvider locale="en">
//       <StaticRouter
//         location={req.url}
//         context={context}
//       >
//         <App />
//       </StaticRouter>
//     </IntlProvider>
//   )
// );

export default ({ jsBundle, cssBundle }) => (req, res) => {
  // const context = {};
  // const root = renderTree(req, context);
  const root = '';

  res.status(200);
  res.send(
    template({
      root,
      jsBundle,
      cssBundle,
    })
  );
};
