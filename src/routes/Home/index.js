import React, { Component } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import Archive from 'components/Archive';
import styles from './Home.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@withRelay({
  fragments: {
    stickies: () => Relay.QL`
      fragment on PostCollection {
        ${Archive.getFragment('posts')}
      }
    `,
    readThis: () => Relay.QL`
      fragment on PostCollection {
        ${Archive.getFragment('posts')}
      }
    `,
    watchThis: () => Relay.QL`
      fragment on PostCollection {
        ${Archive.getFragment('posts')}
      }
    `,
    listenToThis: () => Relay.QL`
      fragment on PostCollection {
        ${Archive.getFragment('posts')}
      }
    `,
  },
})
export default class Home extends Component {
  render() {
    const {
      stickies,
      readThis,
      watchThis,
      listenToThis,
    } = this.props;

    return (
      <div className={styles.columns}>
        <div className={styles.columnA}>
          {stickies && (
            <section className={styles.section}>
              <h3>Latest</h3>
              <Archive posts={stickies} infinite={false} />
            </section>
          )}
          {readThis && (
            <section className={styles.section}>
              <h3>Read This</h3>
              <Archive posts={readThis} infinite={false} />
            </section>
          )}
        </div>
        <div className={styles.columnB}>
          {watchThis && (
            <section className={styles.section}>
              <h3>Watch This</h3>
              <Archive posts={watchThis} infinite={false} />
            </section>
          )}
          {listenToThis && (
            <section className={styles.section}>
              <h3>Listen To This</h3>
              <Archive posts={listenToThis} infinite={false} />
            </section>
          )}
        </div>
      </div>
    );
  }
}
