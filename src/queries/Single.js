import { graphql } from 'react-relay';

export default graphql`
  query Single_Query($id: ID!) {
    post(id: $id) {
      ...Single_post
    }
  }
`;
