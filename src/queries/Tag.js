import { graphql } from 'react-relay';

export default graphql`
  query Tag_Query($id: ID!) {
    tag(id: $id) {
      ...Tag_term
    }
  }
`;
