import React, { Component } from 'react';
import { graphql } from 'react-relay';
import PaginationContainer from 'decorators/PaginationContainer';
import Archive from 'components/Archive';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@PaginationContainer(
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
  `,
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
  `
)
export default class TagArchive extends Component {
  render() {
    const { posts } = this.props;
    return <Archive posts={posts} />;
  }
}
