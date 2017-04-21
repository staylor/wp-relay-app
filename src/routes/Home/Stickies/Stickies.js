import React, { Component } from 'react';
import { graphql } from 'react-relay';
import withPagination from 'decorators/withPagination';
import Archive from 'components/Archive';
import styles from '../Home.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@withPagination(
  graphql`
    query Stickies_Query(
      $count: Int!
      $cursor: String!
    ) {
      stickies {
        ...Stickies_posts
      }
    }
  `,
  graphql`
  fragment Stickies_posts on PostCollection {
    results(first: $count, after: $cursor) @connection(key: "Stickies_results") {
      edges {
        node {
          ...Post_post
        }
        cursor
      }
    }
  }
`)
export default class Stickies extends Component {
  render() {
    const { posts } = this.props;
    return (
      <section className={styles.section}>
        <h3>Latest</h3>
        <Archive posts={posts} infinite={false} />
      </section>
    );
  }
}
