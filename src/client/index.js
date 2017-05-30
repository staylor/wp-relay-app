import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import App from 'components/App';

const root = document.querySelector('#main');
const onUpdate = () => window.scrollTo(0, 0);

render(
  <CookiesProvider>
    <IntlProvider locale="en">
      <BrowserRouter onUpdate={onUpdate}>
        <App />
      </BrowserRouter>
    </IntlProvider>
  </CookiesProvider>,
  root
);
