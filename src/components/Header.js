import React from 'react';
import { Link } from 'react-router-dom';
import NavMenu from '../containers/NavMenu';
import styles from './scss/Header.scss';

const Header = () => (
  <header className={styles.header} role="banner">
    <hgroup>
      <h1 className={styles.siteTitle}>
        <Link to="/">High For This.</Link>
      </h1>
      <h2 className={styles.siteDescription}>Music As It Happens.</h2>
    </hgroup>
    <NavMenu />
  </header>
);

export default Header;
