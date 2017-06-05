import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header';
import styles from './App.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */

const siteName = 'High for This';
const tagline = 'Music as it happens.';
const description = 'High for This aggregates the best music content on the web.';

const App = ({ children }) => (
  <div className={styles.page}>
    <Helmet titleTemplate={`%s - ${siteName}`} defaultTitle={siteName}>
      <html lang="en" prefix="og: http://ogp.me/ns#" />
      <title>{tagline}</title>
      <meta httpEquiv="Content-Language" content="en" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </Helmet>
    <Header />
    <div className={styles.content}>
      <section className={styles.primary}>
        {children}
      </section>
      <section className={styles.secondary} />
    </div>
    <footer className={styles.footerCredits}>
      © Scott Taylor ...&nbsp;
      Brooklyn, NY ... <a href="https://twitter.com/wonderboymusic">@wonderboymusic</a>&nbsp;
      ... Powered by GraphQL / React / Relay / WordPress / nginx / Redis / SCSS
    </footer>
  </div>
);

export default App;
