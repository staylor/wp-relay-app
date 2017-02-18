import React, { Component } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import Post from 'components/Post';
import styles from './Home.scss';

/* eslint-disable react/prop-types */

@withRelay({
  initialVariables: {
    total: 10,
    totalStickies: 5,
  },
  fragments: {
    stickies: () => Relay.QL`
      fragment on PostCollection {
        results(first: $totalStickies) {
          edges {
            node {
              ${Post.getFragment('post')}
            }
            cursor
          }
        }
      }
    `,
    posts: () => Relay.QL`
      fragment on PostCollection {
        results(first: $total) {
          edges {
            node {
              ${Post.getFragment('post')}
            }
            cursor
          }
        }
      }
    `,
  },
})
export default class Home extends Component {
  render() {
    const {
      relay,
      stickies: { results: { edges: stickies } },
      posts: { results: { edges: posts } },
    } = this.props;
    return (
      <div className={styles.section}>
        {stickies && (<section>
          <h3>Latest</h3>
          <ul>
            {stickies.map(({ cursor, node }) => <Post key={cursor} post={node} />)}
          </ul>
        </section>)}
        {posts && (<section>
          <h3>Read This</h3>
          <ul>
            {posts.map(({ cursor, node }) => <Post key={cursor} post={node} />)}
          </ul>
          <button onClick={() => relay.setVariables({ total: relay.variables.total + 10 })}>
            MORE
          </button>
        </section>)}
      </div>
    );
  }
}
