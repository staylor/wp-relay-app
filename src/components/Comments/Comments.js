import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import QueryRenderer from 'decorators/QueryRenderer';
import FragmentContainer from 'decorators/FragmentContainer';
import environment from 'relay/environment';
import AddCommentMutation from 'mutations/AddComment';
import CommentsQuery from 'queries/Comments';
import Walker from './Walker';
import styles from './Comments.scss';

/* eslint-disable react/prop-types */

@QueryRenderer(CommentsQuery)
@FragmentContainer(graphql`
  fragment Comments_comments on CommentCollection {
    results(first: $total) @connection(key: "Comments_results") {
      edges {
        node {
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
      }
    }
  }
`)
export default class Comments extends Component {
  static contextTypes = {
    postId: PropTypes.string,
  };

  constructor(props, context) {
    super(props);

    this.state = {
      comment: {
        author_name: '',
        author_email: '',
        author_url: '',
        content: '',
        post: context.postId,
      },
    };
  }

  onClick = (e) => {
    e.preventDefault();

    const variables = {
      input: {
        ...this.state.comment,
      },
    };

    commitMutation(this.props.relay.environment, {
      mutation: AddCommentMutation,
      variables,
      onCompleted: (response) => {
        if (response.addComment) {
          console.log(response);
        }
      },
      onError: err => console.error(err),
      updater: (store) => {
        const payload = store.getRootField('addComment');
        const newComment = payload.getLinkedRecord('commentEdge');
        const storeRoot = store.getRoot();
        const connection = ConnectionHandler.getConnection(storeRoot, 'Comments_results');
        // const newEdge = ConnectionHandler.createEdge(store, connection, newComment, 'CommentEdge');

        console.log(newComment);
        console.log(storeRoot);
        console.log(connection);
        // console.log(newEdge);
      },
    });
  };

  onChange = (e) => {
    this.setState({
      comment: {
        ...this.state.comment,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    const fields = {
      author_name: 'Name',
      author_email: 'Email',
      author_url: 'URL',
    };
    const { comments: { results: { edges: comments } } } = this.props;

    return (
      <aside className={styles.comments}>
        <h3>Comments</h3>
        <section>
          <form className={styles.form}>
            {Object.keys(fields).map(field => (
              <p key={field}>
                <label htmlFor={field}>{fields[field]}:</label>
                <input
                  type="text"
                  name={field}
                  value={this.state.comment[field]}
                  onChange={this.onChange}
                />
              </p>
            ))}
            <p>
              <label htmlFor="content">Comment:</label>
              <textarea
                rows="6"
                name="content"
                value={this.state.comment.content}
                onChange={this.onChange}
              />
            </p>
            <button type="submit" className={styles.button} onClick={this.onClick}>
              Submit
            </button>
          </form>
          <Walker comments={comments} />
        </section>
      </aside>
    );
  }
}
