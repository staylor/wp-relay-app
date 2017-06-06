import React from 'react';
import { Link } from 'found';
import NavMenu from 'components/NavMenu';
import styles from './Header.scss';

/* eslint-disable react/prop-types */

const Header = ({ navMenu }) => (
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

export default Header;
