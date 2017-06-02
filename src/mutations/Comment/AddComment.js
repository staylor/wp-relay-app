import { graphql, commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import md5 from 'md5';
import environment from 'relay/environment';
import { newlineRegex } from 'utils/regex';

const AddCommentMutation = graphql`
  mutation AddComment_Mutation($input: AddCommentInput!) {
    addComment(input: $input) {
      comment {
        id
        author_name
        author_url
        date
        content {
          rendered
          raw
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

const commit = (variables, onCompleted = null) => {
  const getOptimisticResponse = () => ({
    addComment: {
      comment: {
        id: null,
        author_name: variables.input.author_name,
        author_email: variables.input.author_email,
        author_url: variables.input.author_url,
        date: new Date().toISOString(),
        content: {
          rendered: `<p>${variables.input.content.replace(newlineRegex, '<br />')}</p>`,
        },
        author_avatar_urls: [
          {
            size: 48,
            url: `http://2.gravatar.com/avatar/${md5(variables.input.author_email)}?s=48&d=mm&r=g`,
          },
        ],
        parent: variables.input.parent || 0,
      },
      status: 'new',
      cookies: '',
    },
  });

  const updateConnection = (store) => {
    const payload = store.getRootField('addComment');
    const newComment = payload.getLinkedRecord('comment');
    if (!newComment) {
      return;
    }
    const storeRoot = store.get(variables.input.post);
    const connection = ConnectionHandler.getConnection(storeRoot, 'Single_comments');
    const newEdge = ConnectionHandler.createEdge(store, connection, newComment, 'CommentEdge');
    ConnectionHandler.insertEdgeBefore(connection, newEdge);
  };

  commitMutation(environment, {
    mutation: AddCommentMutation,
    variables,
    onCompleted: (response) => {
      if (response.addComment && response.addComment.cookies) {
        const values = response.addComment.cookies.split(',');
        values.forEach((cookie) => {
          document.cookie = cookie;
        });

        if (onCompleted) {
          onCompleted(response);
        }
      }
    },
    // eslint-disable-next-line no-console
    onError: err => console.error(err),
    updater: updateConnection,
    optimisticUpdater: updateConnection,
    optimisticResponse: getOptimisticResponse,
  });
};

// eslint-disable-next-line import/prefer-default-export
export default { commit };
