import React from 'react';
import Helmet from 'react-helmet';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Home from 'routes/Home';
import Single from 'routes/Single';
import Tag from 'routes/Tag';
import Category from 'routes/Category';
import Author from 'routes/Author';
import styles from './App.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */

const siteName = 'High for This';
const tagline = 'Music as it happens.';
const description = 'High for This aggregates the best music content on the web.';

const renderComponent = Component => ({ match, ...otherProps }) => {
  return <Component id={match.params.id} {...otherProps} />;
};

const App = () => (
  <div className={styles.page}>
    <Helmet
      titleTemplate={`%s - ${siteName}`}
      defaultTitle={siteName}
    >
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
        <Switch>
          <Route path="/post/:id" render={renderComponent(Single)} />
          <Route path="/category/:id" render={renderComponent(Category)} />
          <Route path="/tag/:id" render={renderComponent(Tag)} />
          <Route path="/author/:id" render={renderComponent(Author)} />
          <Route path="/" component={Home} />
        </Switch>
      </section>
      <section className={styles.secondary}>
        <Sidebar id="U2lkZWJhcjpzaWRlYmFyLTE" />
      </section>
    </div>
    <footer className={styles.footerCredits}>&copy; Scott Taylor ...&nbsp;
      Brooklyn, NY ... <a href="https://twitter.com/wonderboymusic">@wonderboymusic</a>&nbsp;
    ... Powered by GraphQL / React / Relay / WordPress / nginx / Redis / SCSS</footer>
  </div>
);

export default App;
