import React, { Component } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import Link from 'react-router/lib/Link';
import styles from './Header.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@withRelay({
  fragments: {
    categories: () => Relay.QL`
      fragment on CategoryCollection {
        results(first: 10) {
          edges {
            node {
              id
              name
            }
            cursor
          }
        }
      }
    `,
  },
})
export default class Header extends Component {
  render() {
    const {
      categories: { results: { edges: categories } },
    } = this.props;

    return (
      <header className={styles.header} role="banner">
        <hgroup>
          <h1 className={styles.siteTitle}>
            <Link to="/">High For This.</Link>
          </h1>
          <h2 className={styles.siteDescription}>Music As It Happens.</h2>
        </hgroup>
        <nav className={styles.access} role="navigation">
          <ul className={styles.nav}>
            <li className={styles.navItem}>
              <Link to="/">Home</Link>
            </li>
            {categories.map(({ node: { id, name }, cursor }) => (
              <li key={cursor} className={styles.navItem}>
                <Link
                  activeClassName={styles.activeLink}
                  to={`/category/${id}`}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    );
  }
}
