import { graphql } from 'react-relay';

export default graphql`
  query Comments_Query($id: ID!) {
    comments(post: $id) {
      ...Comments_comments
    }
  }
`;
