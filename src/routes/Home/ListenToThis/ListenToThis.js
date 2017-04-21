import React, { Component } from 'react';
import { graphql } from 'react-relay';
import withPagination from 'decorators/withPagination';
import Archive from 'components/Archive';
import styles from '../Home.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@withPagination(
  graphql`
    query ListenToThis_Query(
      $categories: String!
      $count: Int!
      $cursor: String!
    ) {
      posts(categories: $categories) {
        ...ListenToThis_posts
      }
    }
  `,
  graphql`
    fragment ListenToThis_posts on PostCollection {
      results(first: $count, after: $cursor) @connection(key: "ListenToThis_results") {
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
export default class ListenToThis extends Component {
  render() {
    const { posts } = this.props;
    return (
      <section className={styles.section}>
        <h3>Listen To This</h3>
        <Archive posts={posts} infinite={false} />
      </section>
    );
  }
}
