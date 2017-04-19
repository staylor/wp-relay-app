import React from 'react';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';
import environment from '../relay/environment';
import NavMenu from '../components/NavMenu';

/* eslint-disable react/prop-types */

export default ({ menuID = 'TmF2TWVudToy' }) => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query NavMenu_Query($menuID: ID!) {
        navMenu(id: $menuID) {
          ...NavMenu_navMenu
        }
      }
    `}
    variables={{
      menuID,
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
