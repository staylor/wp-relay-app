import React, { Component } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import styles from './Sidebar.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
/* eslint-disable react/prefer-stateless-function */

@withRelay({
  fragments: {
    sidebar: () => Relay.QL`
      fragment on Sidebar {
        widgets {
          classname
          content {
            rendered
          }
        }
      }
    `,
  },
})
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
    const {
      widgets,
    } = this.props.sidebar;

    return (
      <ul className={styles.widgets}>
        {widgets.map(({ classname, content: { rendered: widget } }, i) => (
          <li
            key={i}
            dangerouslySetInnerHTML={{
              __html: this.constructor.transformStyles(classname, widget),
            }}
          />
        ))}
      </ul>
    );
  }
}
