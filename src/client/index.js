import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import App from 'components/App';

const root = document.querySelector('#main');
const onUpdate = () => window.scrollTo(0, 0);

render(
  <IntlProvider locale="en">
    <BrowserRouter onUpdate={onUpdate}>
      <App />
    </BrowserRouter>
  </IntlProvider>,
  root
);
