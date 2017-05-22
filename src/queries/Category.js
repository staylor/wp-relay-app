import { graphql } from 'react-relay';

export default graphql`
  query Category_Query($id: ID!) {
    category(id: $id) {
      ...Category_category
    }
  }
`;
