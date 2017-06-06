import { graphql, commitMutation } from 'react-relay';
import { newlineRegex } from 'utils/regex';

const UpdateCommentMutation = graphql`
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

const commit = (comment, environment, variables, onCompleted) => {
  const content = {
    rendered: `<p>${variables.input.content.replace(newlineRegex, '<br />')}</p>`,
    raw: variables.input.content,
  };

  const getOptimisticResponse = () => ({
    updateComment: {
      comment: {
        ...comment,
        content,
      },
      status: 'update',
      cookies: '',
    },
  });

  const updater = (store) => {
    const payload = store.getRootField('updateComment');
    const updatedComment = payload.getLinkedRecord('comment');
    if (!updatedComment) {
      return;
    }
    const storeComment = store.get(comment.id);
    storeComment.copyFieldsFrom(updatedComment);
  };

  commitMutation(environment, {
    mutation: UpdateCommentMutation,
    variables,
    onCompleted: (response) => {
      if (response.updateComment && onCompleted) {
        onCompleted(response);
      }
    },
    updater,
    optimisticUpdater: updater,
    // eslint-disable-next-line no-console
    onError: err => console.error(err),
    optimisticResponse: getOptimisticResponse,
  });
};

export default { commit };
