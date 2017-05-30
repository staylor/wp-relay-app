import React, { Component } from 'react';
import { graphql } from 'react-relay';
import FragmentContainer from 'decorators/FragmentContainer';
import Post from '../Post';
import styles from './Archive.scss';

/* eslint-disable react/prop-types */

@FragmentContainer(graphql`
  fragment Archive_posts on PostCollection {
    results(first: $total) {
      edges {
        node {
          ...Post_post
        }
        cursor
      }
    }
  }
`)
export default class Archive extends Component {
  static defaultProps = {
    infinite: false,
  };

  render() {
    const { posts, relay, infinite } = this.props;

    return (
      <section>
        <ul>
          {posts.results.edges.map(({ cursor, node }) => (
            <li key={cursor}><Post post={node} /></li>
          ))}
        </ul>
        {infinite &&
          relay.hasMore() &&
          <button
            className={styles.button}
            onClick={() => {
              if (relay.isLoading()) {
                return;
              }

              relay.loadMore(
                10,
                // eslint-disable-next-line no-console
                e => console.log(e)
              );
            }}
          >
            MORE
          </button>}
      </section>
    );
  }
}
