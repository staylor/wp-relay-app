import { graphql } from 'react-relay';

export default graphql`
  mutation AddComment_Mutation($input: AddCommentInput!) {
    addComment(input: $input) {
      comment {
        id
        content {
          rendered
        }
        post {
          id
          title {
            rendered
          }
        }
      }
      cookies
      status
    }
  }
`;
