import React from 'react';
import { QueryRenderer } from 'react-relay';
import Page from 'routes/Page';
import PageQuery from 'queries/Page';
import environment from '../relay/environment';

/* eslint-disable react/prop-types */

export default () => (
  <QueryRenderer
    environment={environment}
    query={PageQuery}
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
