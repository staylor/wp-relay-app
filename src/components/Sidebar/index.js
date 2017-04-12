import React, { Component } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import styles from './Sidebar.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */

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
}) // eslint-disable-next-line react/prefer-stateless-function
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
