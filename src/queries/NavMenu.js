import { graphql } from 'react-relay';

export default graphql`
  query NavMenu_Query($id: ID!) {
    navMenu(id: $id) {
      ...NavMenu_menu
    }
  }
`;
