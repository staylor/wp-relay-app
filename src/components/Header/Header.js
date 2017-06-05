import React from 'react';
import { Link } from 'found';
import NavMenu from 'components/NavMenu';
import styles from './Header.scss';

const Header = () => (
  <header className={styles.header} role="banner">
    <hgroup>
      <h1 className={styles.siteTitle}>
        <Link to="/">High For This.</Link>
      </h1>
      <h2 className={styles.siteDescription}>Music As It Happens.</h2>
    </hgroup>
  </header>
);

export default Header;
