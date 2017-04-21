import React from 'react';
import { QueryRenderer } from 'react-relay';
import Sidebar from 'components/Sidebar';
import SidebarQuery from 'queries/Sidebar';
import environment from '../relay/environment';

export default () => (
  <QueryRenderer
    environment={environment}
    query={SidebarQuery}
    variables={{
      id: 'U2lkZWJhcjpzaWRlYmFyLTE=',
    }}
    render={({ error, props }) => {
      if (error) {
        console.log(error.message);
        return null;
      } else if (props) {
        return <Sidebar {...props} />;
      }
      return null;
    }}
  />
);
