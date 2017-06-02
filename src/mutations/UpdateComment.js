import { graphql } from 'react-relay';

export default graphql`
  mutation UpdateComment_Mutation($input: UpdateCommentInput!) {
    updateComment(input: $input) {
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
