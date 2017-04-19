import React from 'react';
import Helmet from 'react-helmet';
import Header from '../components/Header';
import Sidebar from '../containers/Sidebar';
import styles from './scss/App.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */

const App = ({ children }) => (
  <div className={styles.page}>
    <Helmet
      titleTemplate="%s - High for This"
      defaultTitle="High for This"
    >
      <html lang="en" />
      <title>Music as it happens.</title>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <script src="//use.typekit.net/tts4dcv.js" />
      <script dangerouslySetInnerHTML={{ __html: 'try{Typekit.load();}catch(e){}' }} />
      <link id="favicon" rel="shortcut icon" href="/kyt-favicon.png" sizes="16x16 32x32" type="image/png" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" />
    </Helmet>
    <Header />
    <div className={styles.content}>
      <section className={styles.primary}>
        {children}
      </section>
      <section className={styles.secondary}>
        <Sidebar />
      </section>
    </div>
    <footer className={styles.footerCredits}>&copy; Scott Taylor ...&nbsp;
      Brooklyn, NY ... <a href="https://twitter.com/wonderboymusic">@wonderboymusic</a>&nbsp;
    ... Powered by GraphQL / React / Relay / WordPress / nginx / Redis / SCSS</footer>
  </div>
);

export default App;
