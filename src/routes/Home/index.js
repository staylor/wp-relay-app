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
      <div className={styles.section}>
        <h3>Latest</h3>
        {stickies && <Archive posts={stickies} infinite={false} />}
        <h3>Read This</h3>
        {readThis && <Archive posts={readThis} infinite={false} />}
        <h3>Watch This</h3>
        {watchThis && <Archive posts={watchThis} infinite={false} />}
        <h3>Listen To This</h3>
        {listenToThis && <Archive posts={listenToThis} infinite={false} />}
      </div>
    );
  }
}
