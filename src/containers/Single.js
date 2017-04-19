import React from 'react';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';
import environment from '../relay/environment';
import Single from '../routes/Single';

/* eslint-disable react/prop-types */

export default () => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query Single_Query($id: ID!) {
        post(id: $id) {
          ...Single_post
        }
      }
    `}
    render={({ error, props }) => {
      if (error) {
        console.log(error.message);
        return null;
      } else if (props) {
        return <Single {...props} />;
      }
      return null;
    }}
  />
);
