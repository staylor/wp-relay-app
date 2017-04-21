import React from 'react';
import { QueryRenderer } from 'react-relay';
import Single from 'routes/Single';
import SingleQuery from 'queries/Single';
import environment from '../relay/environment';

/* eslint-disable react/prop-types */

export default () => (
  <QueryRenderer
    environment={environment}
    query={SingleQuery}
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
