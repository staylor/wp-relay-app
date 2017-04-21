import React, { Component } from 'react';
import Post from '../Post';
import styles from './Archive.scss';

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
        {this.props.infinite && this.props.relay.hasMore() && (
          <button
            className={styles.button}
            onClick={() => {
              if (this.props.relay.isLoading()) {
                return;
              }

              this.props.relay.loadMore(
                10,
                // eslint-disable-next-line no-console
                e => console.log(e)
              );
            }}
          >
            MORE
          </button>
      )}
      </section>
    );
  }
}

export default Archive;
