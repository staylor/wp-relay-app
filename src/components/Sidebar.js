import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import styles from './scss/Sidebar.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */

class Sidebar extends Component {
  static transformStyles(classname, html) {
    if (classname === 'widget_go_to_this') {
      return html
        .replace(/widget-title/g, styles.title)
        .replace(/widget_go_to_this/g, styles.goToThis);
    }
    return html;
  }

  render() {
    const {
      widgets,
    } = this.props.sidebar;

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

export default createFragmentContainer(Sidebar, graphql`
  fragment Sidebar_sidebar on Sidebar {
    widgets {
      classname
      content {
        rendered
      }
    }
  }
`);
