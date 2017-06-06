import React, { Component } from 'react';
import Post from '../Post';
import styles from './Archive.scss';

/* eslint-disable react/prop-types */

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
