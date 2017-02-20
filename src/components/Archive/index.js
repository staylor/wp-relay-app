import React, { Component } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import Post from 'components/Post';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@withRelay({
  initialVariables: {
    total: 10,
  },
  fragments: {
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
export default class Archive extends Component {
  render() {
    const {
      relay,
      posts: { results: { edges: posts } },
    } = this.props;
    return (
      <section>
        <ul>
          {posts.map(({ cursor, node }) => <Post key={cursor} post={node} />)}
        </ul>
        <button onClick={() => relay.setVariables({ total: relay.variables.total + 10 })}>
          MORE
        </button>
      </section>
    );
  }
}
