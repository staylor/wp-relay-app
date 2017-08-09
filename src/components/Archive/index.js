import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import Post from '../Post';
import styles from './styles';

const Archive = ({ posts: { edges }, relay }) => [
  <ul key={'ul'}>
    {edges.map(({ cursor, node }) =>
      <li key={cursor}>
        <Post post={node} />
      </li>
    )}
  </ul>,
  relay &&
    relay.hasMore() &&
    <button
      key={'button'}
      className={css(styles.button)}
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
    </button>,
];

Archive.propTypes = {
  posts: PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.object,
        cursor: PropTypes.string,
      })
    ),
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  relay: PropTypes.object,
};

Archive.defaultProps = {
  relay: null,
};

export default Archive;
