import React, { Component } from 'react';
import Post from '../Post';
import styles from './Archive.scss';

/* eslint-disable react/prop-types */

export default class Archive extends Component {
  render() {
    const { posts: { edges }, relay } = this.props;

    return (
      <section>
        <ul>
          {edges.map(({ cursor, node }) => <li key={cursor}><Post post={node} /></li>)}
        </ul>
        {relay &&
          relay.hasMore() &&
          <button
            className={styles.button}
            onClick={() => {
              if (relay.isLoading()) {
                return;
              }

              relay.loadMore(10, e => {
                if (e) {
                  // eslint-disable-next-line no-console
                  console.log(e);
                }
              });
            }}
          >
            MORE
          </button>}
      </section>
    );
  }
}
