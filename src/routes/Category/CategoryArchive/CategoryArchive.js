import React, { Component } from 'react';
import { graphql } from 'react-relay';
import withPagination from 'decorators/withPagination';
import Archive from 'components/Archive';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@withPagination(
  graphql`
    query CategoryArchive_Query(
      $categories: String!
      $count: Int!
      $cursor: String!
    ) {
      posts(categories: $categories) {
        ...CategoryArchive_posts
      }
    }
  `,
  graphql`
    fragment CategoryArchive_posts on PostCollection {
      results(first: $count, after: $cursor) @connection(key: "CategoryArchive_results") {
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
export default class CategoryArchive extends Component {
  render() {
    const { posts } = this.props;
    return <Archive posts={posts} />;
  }
}
