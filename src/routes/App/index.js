import React, { Component } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import styles from './App.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@withRelay({
  fragments: {
    categories: () => Relay.QL`
      fragment on CategoryCollection {
        ${Header.getFragment('categories')}
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
      categories,
      sidebar,
    } = this.props;

    return (
      <div className={styles.page}>
        <Header categories={categories} />
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
