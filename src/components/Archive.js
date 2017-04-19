import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Post from './Post';
import styles from './scss/Archive.scss';

/* eslint-disable react/prop-types */

class Archive extends Component {
  static defaultProps = {
    infinite: true,
  };

  render() {
    const {
      posts: {
        results: {
          edges: posts,
          pageInfo: {
            hasNextPage,
          },
        },
      },
    } = this.props;
    return (
      <section>
        <ul>
          {posts.map(({ cursor, node }) => (
            <li key={cursor}><Post post={node} /></li>
          ))}
        </ul>
        {this.props.infinite && hasNextPage && (
          <button
            className={styles.button}
            onClick={() => {
              this.props.relay.setVariables({
                total: this.props.relay.variables.total + 10,
              });
            }}
          >
            MORE
          </button>
      )}
      </section>
    );
  }
}

export default createFragmentContainer(Archive, graphql`
  fragment Archive_posts on PostCollection {
    results(first: $total) {
      edges {
        node {
          ...Post_post
        }
        cursor
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`);
