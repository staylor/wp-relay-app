import url from 'url';
import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './scss/NavMenu.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */

class NavMenu extends Component {
  sorted = null;
  level = 0;

  static sortItems(items) {
    const nested = {
      top: [],
    };
    items.forEach((item) => {
      const { parent, order } = item;
      if (!parent) {
        nested.top[order] = item;
        return;
      }

      if (!nested[parent]) {
        nested[parent] = [];
      }
      nested[parent][order] = item;
    });

    Object.keys(nested).forEach((key) => {
      nested[key].sort((a, b) => a.order - b.order);
      nested[key] = nested[key].filter(() => true);
    });

    return nested;
  }

  parseItem({
    id,
    title,
    url: itemUrl,
    object,
    object_id: objectId,
  }) {
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
        {node.map((child) => {
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

    this.sorted = this.constructor.sortItems(navMenu.items);
    const navMenuHtml = this.walk(this.sorted.top);

    return (
      <nav className={styles.access} role="navigation">
        {navMenuHtml}
      </nav>
    );
  }
}

export default createFragmentContainer(NavMenu, graphql`
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
  `
);
