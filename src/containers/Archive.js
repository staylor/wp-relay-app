import React, { Component } from 'react';
import ArchiveComponent from 'wp-styled-components/lib/Archive';
import Post from 'components/Post';
import type { ArchiveProps } from 'wp-relay-app';

export default class Archive extends Component {
  props: ArchiveProps;

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
