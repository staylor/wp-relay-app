import React, { Component } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import Post from 'components/Post';
import styles from './Archive.scss';

/* eslint-disable react/prop-types */

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
          pageInfo {
            hasNextPage
          }
        }
      }
    `,
  },
})
export default class Archive extends Component {
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
