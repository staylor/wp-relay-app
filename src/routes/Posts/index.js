import React, { Component } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import Archive from 'components/Archive';
import styles from './Posts.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@withRelay({
  fragments: {
    posts: () => Relay.QL`
      fragment on PostCollection {
        ${Archive.getFragment('posts')}
      }
    `,
  },
})
export default class Posts extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div className={styles.sections}>
        <section>
          <h3>TK TK TK TK</h3>
          <Archive posts={posts} />
        </section>
      </div>
    );
  }
}
