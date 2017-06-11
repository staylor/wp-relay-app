import url from 'url';
import cn from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import { Link } from 'found';
import FragmentContainer from 'decorators/FragmentContainer';
import { sortOrderedHierarchy } from 'utils/walker';
import styles from './NavMenu.scss';

@FragmentContainer(graphql`
  fragment NavMenu_navMenu on NavMenu {
    id
    name
    items {
      id
      title
      url
      parent
      order
      object
      object_id
    }
  }
`)
export default class NavMenu extends Component {
  static propTypes = {
    navMenu: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      url: PropTypes.string,
      object: PropTypes.String,
      object_id: PropTypes.String,
    }).isRequired,
  };

  sorted = null;
  level = 0;

  parseItem({ id, title, url: itemUrl, object, object_id: objectId }) {
    let path;
    if (object === 'category' || object === 'post') {
      path = `/${object}/${objectId}`;
    } else {
      const urlObj = url.parse(itemUrl);
      if (urlObj.path === '/') {
        path = urlObj.path;
      } else {
        path = urlObj.path.replace(/\/$/, '');
      }
    }

    if (this.sorted[id]) {
      this.level += 1;
    }
    return (
      <li key={id} className={cn(styles.navItem, styles[`level${this.level}`])}>
        <Link to={path}>{title}</Link>
        {this.sorted[id] ? this.walk(this.sorted[id]) : null}
      </li>
    );
  }

  walk(node) {
    return (
      <ul>
        {node.map(child => {
          if (!child.parent) {
            this.level = 0;
          }
          return this.parseItem(child);
        })}
      </ul>
    );
  }

  render() {
    const { navMenu } = this.props;

    if (!navMenu) {
      return null;
    }

    this.sorted = sortOrderedHierarchy(navMenu.items);
    const navMenuHtml = this.walk(this.sorted.top);

    return (
      <nav className={styles.access} role="navigation">
        {navMenuHtml}
      </nav>
    );
  }
}
