import { graphql, commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

const DeleteCommentMutation = graphql`
  mutation DeleteComment_Mutation($input: DeleteCommentInput!) {
    deleteComment(input: $input) {
      status
    }
  }
`;

const commit = (comment, environment, onCompleted) => {
  const getOptimisticResponse = () => ({
    deleteComment: {
      status: 'delete',
    },
  });

  const updater = store => {
    const payload = store.getRootField('deleteComment');
    if (payload.getValue('status') !== 'delete') {
      return;
    }
    const storeRoot = store.get(comment.post.id);
    const connection = ConnectionHandler.getConnection(storeRoot, 'Single_comments');
    ConnectionHandler.deleteNode(connection, comment.id);
  };

  commitMutation(environment, {
    mutation: DeleteCommentMutation,
    variables: {
      input: {
        id: comment.id,
      },
    },
    onCompleted: response => {
      if (response.deleteComment && onCompleted) {
        onCompleted(response);
      }
    },
    // eslint-disable-next-line no-console
    onError: err => console.error(err),
    updater,
    optimisticUpdater: updater,
    optimisticResponse: getOptimisticResponse,
  });
};

export default { commit };
