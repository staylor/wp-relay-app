import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArchiveComponent from 'wp-styled-components/lib/Archive';
import Post from 'components/Post';

export default class Archive extends Component {
  static propTypes = {
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

  static defaultProps = {
    relay: null,
  };

  render() {
    const { relay, posts } = this.props;
    return (
      <ArchiveComponent
        edges={posts.edges}
        component={Post}
        canLoadMore={relay && relay.hasMore()}
        loadMore={() => {
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
      />
    );
  }
}
