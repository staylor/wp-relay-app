import React, { Component } from 'react';
import { graphql } from 'react-relay';
import FragmentContainer from 'decorators/FragmentContainer';
import Post from '../Post';
import styles from './Archive.scss';

/* eslint-disable react/prop-types */

@FragmentContainer(graphql`
  fragment Archive_posts on PostConnection {
    edges {
      node {
        ...Post_post
      }
      cursor
    }
  }
`)
export default class Archive extends Component {
  static defaultProps = {
    infinite: false,
  };

  render() {
    const { posts: { edges }, relay, infinite } = this.props;

    return (
      <section>
        <ul>
          {edges.map(({ cursor, node }) => <li key={cursor}><Post post={node} /></li>)}
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
