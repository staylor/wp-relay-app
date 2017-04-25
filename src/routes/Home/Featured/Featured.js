import React, { Component } from 'react';
import { graphql } from 'react-relay';
import QueryRenderer from 'decorators/QueryRenderer';
import Archive from 'components/Archive';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@QueryRenderer(graphql`
  query FeaturedQuery(
    $categories: String
    $total: Int
  ) {
    posts(categories: $categories) {
      ...Archive_posts
    }
  }
`)
class Featured extends Component {
  render() {
    const { posts } = this.props;

    return <Archive posts={posts} />;
  }
}

export default Featured;
