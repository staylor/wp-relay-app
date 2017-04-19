import React from 'react';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';
import environment from '../relay/environment';
import Page from '../routes/Page';

/* eslint-disable react/prop-types */

export default () => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query Page_Query($slug: String!) {
        page(slug: $slug) {
          ...Page_page
        }
      }
    `}
    render={({ error, props }) => {
      if (error) {
        console.log(error.message);
        return null;
      } else if (props) {
        return <Page {...props} />;
      }
      return null;
    }}
  />
);
