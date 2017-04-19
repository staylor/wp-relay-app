import React from 'react';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';
import environment from '../relay/environment';
import Archive from '../components/Archive';

/* eslint-disable react/prop-types */

export default ({ categoryID }) => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query HomeCollection_Query($categoryID: String!) {
        posts(categories: $categoryID) {
          ...Archive_posts
        }
      }
    `}
    variables={{
      categoryID,
    }}
    render={({ error, props }) => {
      if (error) {
        console.log(error.message);
        return null;
      } else if (props) {
        return <Archive {...props} infinite={false} />;
      }
      return null;
    }}
  />
);
