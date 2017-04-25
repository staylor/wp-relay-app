import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Relay, { withRelay } from 'decorators/withRelay';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import styles from './App.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@withRelay({
  fragments: {
    navMenu: () => Relay.QL`
      fragment on NavMenu {
        ${Header.getFragment('navMenu')}
      }
    `,
    sidebar: () => Relay.QL`
      fragment on Sidebar {
        ${Sidebar.getFragment('sidebar')}
      }
    `,
  },
})
export default class App extends Component {

  render() {
    const {
      children,
      sidebar,
      navMenu,
    } = this.props;

    return (
      <div className={styles.page}>
        <Helmet
          titleTemplate="%s - High for This"
          defaultTitle="High for This"
        >
          <html lang="en" />
          <title>Music as it happens.</title>
          <meta httpEquiv="Content-Language" content="en" />
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
        <footer className={styles.footerCredits}>&copy; Scott Taylor ...&nbsp;
          Brooklyn, NY ... <a href="https://twitter.com/wonderboymusic">@wonderboymusic</a>&nbsp;
        ... Powered by GraphQL / React / Relay / WordPress / nginx / Redis / SCSS</footer>
      </div>
    );
  }
}
