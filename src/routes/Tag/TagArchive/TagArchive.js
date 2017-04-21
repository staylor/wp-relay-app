import React, { Component } from 'react';
import { graphql } from 'react-relay';
import withPagination from 'decorators/withPagination';
import Archive from 'components/Archive';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@withPagination(
  graphql`
    query TagArchive_Query(
      $tags: String!
      $count: Int!
      $cursor: String!
    ) {
      posts(tags: $tags) {
        ...TagArchive_posts
      }
    }
  `,
  graphql`
    fragment TagArchive_posts on PostCollection {
      results(first: $count, after: $cursor) @connection(key: "TagArchive_results") {
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
export default class TagArchive extends Component {
  render() {
    const { posts } = this.props;
    return <Archive posts={posts} />;
  }
}
