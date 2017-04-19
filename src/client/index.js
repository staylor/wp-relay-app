import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from '../routes';

const root = document.querySelector('#main');

const mount = (Routes = AppRoutes) => {
  render(
    <IntlProvider locale="en">
      <Router onUpdate={() => { window.scrollTo(0, 0); }}>
        <Routes />
      </Router>
    </IntlProvider>,
    root
  );
};

mount();

if (module.hot) {
  // Rerender after any changes to the following.
  module.hot.accept('../routes', () => {
    const newRoutes = require('../routes').default; // eslint-disable-line global-require

    mount(newRoutes);
  });
}
