import { graphql } from 'react-relay';

export default graphql`
  query Author_Query($id: ID!) {
    user(id: $id) {
      ...Author_author
    }
  }
`;
