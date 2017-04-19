import React from 'react';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';
import environment from '../relay/environment';
import Sidebar from '../components/Sidebar';

export default () => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query Sidebar_Query($sidebarID: ID!) {
        sidebar(id: $sidebarID) {
          ...Sidebar_sidebar
        }
      }
    `}
    variables={{
      sidebarID: 'U2lkZWJhcjpzaWRlYmFyLTE=',
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
