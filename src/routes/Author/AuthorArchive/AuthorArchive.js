import React, { Component } from 'react';
import { graphql } from 'react-relay';
import PaginationContainer from 'decorators/PaginationContainer';
import Archive from 'components/Archive';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@PaginationContainer(
  graphql`
    query AuthorArchive_Query(
      $id: String!
      $count: Int!
      $cursor: String!
    ) {
      posts(author: $id) {
        results(first: $count, after: $cursor) @connection(key: "AuthorArchive_results") {
          edges {
            node {
              id
              ...Post_post
            }
            cursor
          }
        }
      }
    }
  `,
  graphql`
    fragment AuthorArchive_posts on PostCollection {
      results(first: $count, after: $cursor) @connection(key: "AuthorArchive_results") {
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
export default class AuthorArchive extends Component {
  render() {
    const { posts } = this.props;
    return <Archive posts={posts} />;
  }
}
