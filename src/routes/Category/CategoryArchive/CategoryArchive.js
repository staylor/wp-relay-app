import React, { Component } from 'react';
import { graphql } from 'react-relay';
import QueryRenderer from 'decorators/QueryRenderer';
import PaginationContainer from 'decorators/PaginationContainer';
import Archive from 'components/Archive';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@QueryRenderer(graphql`
  query CategoryArchive_Query(
    $id: String!
    $count: Int!
  ) {
    posts(categories: $id) {
      ...CategoryArchive_posts
    }
  }
`)
@PaginationContainer(
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
  `,
  graphql`
    query CategoryArchive_Query(
      $id: String!
      $count: Int!
      $cursor: String
    ) {
      posts(categories: $id) {
        ...CategoryArchive_posts
      }
    }
  `
)
export default class CategoryArchive extends Component {
  render() {
    return <Archive {...this.props} infinite />;
  }
}
