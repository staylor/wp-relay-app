import React, { Component } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import Archive from 'components/Archive';
import styles from './Author.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@withRelay({
  fragments: {
    author: () => Relay.QL`
      fragment on User {
        name
      }
    `,
    posts: () => Relay.QL`
      fragment on PostCollection {
        ${Archive.getFragment('posts')}
      }
    `,
  },
})
export default class Author extends Component {
  render() {
    const { user, posts } = this.props;
    return (
      <div className={styles.sections}>
        <section>
          <h3>{user.name}</h3>
          <Archive posts={posts} />
        </section>
      </div>
    );
  }
}
