import { graphql } from 'react-relay';

export default graphql`
  mutation AddComment_Mutation($input: AddCommentInput!) {
    addComment(input: $input) {
      comment {
        id
        author_name
        author_url
        date
        content {
          rendered
        }
        author_avatar_urls {
          size
          url
        }
        parent
      }
      cookies
      status
    }
  }
`;
