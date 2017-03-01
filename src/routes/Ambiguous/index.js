import React, { Component } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import Archive from 'components/Archive';
import Page from '../Page';
import styles from './Ambiguous.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@withRelay({
  fragments: {
    year: () => Relay.QL`
      fragment on PostCollection {
        ${Archive.getFragment('posts')}
      }
    `,
    page: () => Relay.QL`
      fragment on Page {
        ${Page.getFragment('page')}
      }
    `,
  },
})
export default class Ambiguous extends Component {
  render() {
    const { year, page } = this.props;
    if (page) {
      return <Page {...this.props} />;
    }

    return (
      <div className={styles.sections}>
        <section>
          <h3>TK TK TK TK</h3>
          <Archive posts={year} />
        </section>
      </div>
    );
  }
}
