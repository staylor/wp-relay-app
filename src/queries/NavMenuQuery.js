import { graphql } from 'react-relay';

export default graphql`
  query NavMenuQuery($id: ID!) {
    navMenu(id: $id) {
      id
      name
      items {
        id
        title
        url
        parent
        order
        object
        object_id
      }
    }
  }
`;
