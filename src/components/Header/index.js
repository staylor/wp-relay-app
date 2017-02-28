import React, { Component } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import Link from 'react-router/lib/Link';
import NavMenu from 'components/NavMenu';
import styles from './Header.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@withRelay({
  fragments: {
    navMenu: () => Relay.QL`
      fragment on NavMenu {
        ${NavMenu.getFragment('navMenu')}
      }
    `,
  },
})
export default class Header extends Component {

  render() {
    const { navMenu } = this.props;

    return (
      <header className={styles.header} role="banner">
        <hgroup>
          <h1 className={styles.siteTitle}>
            <Link to="/">High For This.</Link>
          </h1>
          <h2 className={styles.siteDescription}>Music As It Happens.</h2>
        </hgroup>
        <NavMenu navMenu={navMenu} />
      </header>
    );
  }
}
