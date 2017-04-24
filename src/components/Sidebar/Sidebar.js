import React, { Component } from 'react';
import QueryRenderer from 'decorators/QueryRenderer';
import SidebarQuery from 'queries/SidebarQuery';
import styles from './Sidebar.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */

@QueryRenderer(SidebarQuery)
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
    const { sidebar } = this.props;

    let i = 0;
    const key = () => {
      i += 1;
      return `widget-${i}`;
    };

    return (
      <ul className={styles.widgets}>
        {sidebar.widgets.map(({ classname, content: { rendered: widget } }) => (
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
