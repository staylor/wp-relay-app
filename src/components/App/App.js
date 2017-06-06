import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
import Helmet from 'react-helmet';
import { graphql } from 'react-relay';
import FragmentContainer from 'decorators/FragmentContainer';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import styles from './App.scss';

/* eslint-disable react/prop-types */

const siteName = 'High for This';
const tagline = 'Music as it happens.';
const description = 'High for This aggregates the best music content on the web.';

@FragmentContainer(graphql`
  fragment App_viewer on Viewer {
    navMenu(id: $menuID) {
      ...NavMenu_navMenu
    }
    sidebar(id: $sidebarID) {
      ...Sidebar_sidebar
    }
  }
`)
export default class App extends Component {
  state = {
    locale: 'en',
  };

  render() {
    const { viewer: { navMenu, sidebar }, children } = this.props;

    return (
      <IntlProvider locale={this.state.locale}>
        <div className={styles.page}>
          <Helmet titleTemplate={`%s - ${siteName}`} defaultTitle={siteName}>
            <html lang={this.state.locale} prefix="og: http://ogp.me/ns#" />
            <title>{tagline}</title>
            <meta httpEquiv="Content-Language" content={this.state.locale} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
          </Helmet>
          <Header navMenu={navMenu} />
          <div className={styles.content}>
            <section className={styles.primary}>
              {children}
            </section>
            <section className={styles.secondary}>
              <Sidebar sidebar={sidebar} />
            </section>
          </div>
          <footer className={styles.footerCredits}>
            © Scott Taylor ...&nbsp;
            Brooklyn, NY ... <a href="https://twitter.com/wonderboymusic">@wonderboymusic</a>&nbsp;
            ... Powered by GraphQL / React / Relay / WordPress / nginx / Redis / SCSS
          </footer>
        </div>
      </IntlProvider>
    );
  }
}
