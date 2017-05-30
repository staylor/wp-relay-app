import { graphql } from 'react-relay';

export default graphql`
  query Comments_Query($id: ID!, $total: Int) {
    comments(post: $id) {
      ...Comments_comments
    }
  }
`;
