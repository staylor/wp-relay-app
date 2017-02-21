import React, { Component } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import Header from 'components/Header';
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
  },
})
export default class App extends Component {

  render() {
    const {
      children,
      categories,
    } = this.props;

    return (
      <div className={styles.page}>
        <Header categories={categories} />
        <div className={styles.content}>
          {children}
        </div>
        <p className={styles.footerCredits}>&copy; Scott Taylor ...&nbsp;
          Brooklyn, NY ... <a href="https://twitter.com/wonderboymusic">@wonderboymusic</a>&nbsp;
        ... Powered by GraphQL / React / Relay / WordPress / nginx / Redis / SCSS</p>
      </div>
    );
  }
}
