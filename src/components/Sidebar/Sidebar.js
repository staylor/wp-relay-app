import React, { Component } from 'react';
import { graphql } from 'react-relay';
import GraphQL from 'decorators/GraphQL';
import withFragment from 'decorators/withFragment';
import SidebarQuery from 'queries/Sidebar';
import styles from './Sidebar.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */

@GraphQL(SidebarQuery)
@withFragment(graphql`
  fragment Sidebar_sidebar on Sidebar {
    widgets {
      classname
      content {
        rendered
      }
    }
  }`
)
export default class Sidebar extends Component {
  static transformStyles(classname, html) {
    if (classname === 'widget_go_to_this') {
      return html
        .replace(/widget-title/g, styles.title)
        .replace(/widget_go_to_this/g, styles.goToThis);
    }
    return html;
  }

  render() {
    console.log(this.props.sidebar);
    console.log(this.props.sidebar.widgets);
    const { widgets } = this.props.sidebar;

    let i = 0;
    const key = () => {
      i += 1;
      return `widget-${i}`;
    };

    return (
      <ul className={styles.widgets}>
        {widgets.map(({ classname, content: { rendered: widget } }) => (
          <li
            key={key()}
            dangerouslySetInnerHTML={{
              __html: this.constructor.transformStyles(classname, widget),
            }}
          />
        ))}
      </ul>
    );
  }
}
