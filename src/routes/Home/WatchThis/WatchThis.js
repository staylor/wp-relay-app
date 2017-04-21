import React, { Component } from 'react';
import { graphql } from 'react-relay';
import withPagination from 'decorators/withPagination';
import Archive from 'components/Archive';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@withPagination(
  graphql`
    query WatchThisPosts_Query(
      $categories: String!
      $count: Int!
      $cursor: String!
    ) {
      posts(categories: $categories) {
        ...WatchThis_posts
      }
    }
  `,
  graphql`
    fragment WatchThis_posts on PostCollection {
      results(first: $count, after: $cursor) @connection(key: "WatchThis_results") {
        edges {
          node {
            id
            ...Post_post
          }
          cursor
        }
      }
    }
  `
)
export default class WatchThis extends Component {
  render() {
    const { posts } = this.props;
    return <Archive posts={posts} infinite={false} />;
  }
}
