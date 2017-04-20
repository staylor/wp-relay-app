import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import App from 'components/App';

const root = document.querySelector('#main');

render(
  <IntlProvider locale="en">
    <BrowserRouter onUpdate={() => { window.scrollTo(0, 0); }}>
      <App />
    </BrowserRouter>
  </IntlProvider>,
  root
);
