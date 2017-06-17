import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'found';
import NavMenu from 'components/NavMenu';
import styles from './Header.scss';

const Header = ({ settings, navMenu }) =>
  <header className={styles.header} role="banner">
    <hgroup>
      <h1 className={styles.siteTitle}>
        <Link to="/">{settings.title}</Link>
      </h1>
      <h2 className={styles.siteDescription}>{settings.description}</h2>
    </hgroup>
    <NavMenu navMenu={navMenu} />
  </header>;

Header.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  settings: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  navMenu: PropTypes.object.isRequired,
};

export default Header;
