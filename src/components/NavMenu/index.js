import url from 'url';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import { Link } from 'found';
import { NavWrapper, Level, NavItem } from 'wp-styled-components/lib/NavMenu';
import FragmentContainer from 'decorators/FragmentContainer';
import { sortOrderedHierarchy } from 'utils/walker';

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
      type
      typeName
      typeSlug
      dataSlug
      dataID
    }
  }
`)
export default class NavMenu extends Component {
  static propTypes = {
    navMenu: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          title: PropTypes.string,
          url: PropTypes.string,
          parent: PropTypes.string,
          order: PropTypes.number,
          type: PropTypes.string,
          typeName: PropTypes.string,
          typeSlug: PropTypes.string,
          dataSlug: PropTypes.string,
          dataID: PropTypes.string,
        })
      ),
    }).isRequired,
  };

  sorted = null;
  level = 0;

  parseItem({ id, title, url: itemUrl, typeSlug, dataSlug }) {
    let path;
    if (typeSlug && dataSlug) {
      path = `/${typeSlug}/${dataSlug}`;
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
      <NavItem key={id}>
        <Link to={path}>
          {title}
        </Link>
        {this.sorted[id] ? this.walk(this.sorted[id]) : null}
      </NavItem>
    );
  }

  walk(node) {
    return (
      <Level>
        {node.map(child => {
          if (!child.parent) {
            this.level = 0;
          }
          return this.parseItem(child);
        })}
      </Level>
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
      <NavWrapper>
        {navMenuHtml}
      </NavWrapper>
    );
  }
}
