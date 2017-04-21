import React from 'react';
import { QueryRenderer } from 'react-relay';
import NavMenu from 'components/NavMenu';
import NavMenuQuery from 'queries/NavMenu';
import environment from '../relay/environment';

/* eslint-disable react/prop-types */

export default ({ id = 'TmF2TWVudToy' }) => (
  <QueryRenderer
    environment={environment}
    query={NavMenuQuery}
    variables={{
      id,
    }}
    render={({ error, props }) => {
      if (error) {
        console.log(error.message);
        return null;
      } else if (props) {
        console.log(props);
        return <NavMenu {...props} />;
      }
      return null;
    }}
  />
);
