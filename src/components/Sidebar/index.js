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
        widgets
      }
    `,
  },
})
export default class Sidebar extends Component {
  render() {
    const {
      sidebar: { widgets },
    } = this.props;

    return (
      <ul className={styles.widgets}>
        {widgets.map((widget, i) => <li key={i} dangerouslySetInnerHTML={{ __html: widget }} />)}
      </ul>
    );
  }
}
