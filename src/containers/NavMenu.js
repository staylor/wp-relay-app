import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import NavMenu from 'wp-styled-components/lib/NavMenu';

export default createFragmentContainer(
  ({ navMenu }) => {
    if (!navMenu) {
      return null;
    }
    return <NavMenu navMenu={navMenu} />;
  },
  graphql`
    fragment NavMenu_navMenu on NavMenu {
      id
      name
      items {
        id
        title
        url
        parent
        order
        type
        typeName
        typeSlug
        dataSlug
        dataID
      }
    }
  `
);
