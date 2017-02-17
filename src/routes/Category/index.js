import React, { Component } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import Post from 'components/Post';

/* eslint-disable react/prop-types */

@withRelay({
  initialVariables: {
    total: 10,
  },
  fragments: {
    category: () => Relay.QL`
      fragment on Category {
        name
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
export default class Category extends Component {
  render() {
    const {
      relay,
      category,
      posts: { results: { edges: posts } },
    } = this.props;
    return (
      <div className="sections">
        {category && (<section>
          <h3>{category.name}</h3>
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
