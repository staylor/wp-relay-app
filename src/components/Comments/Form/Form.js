import React, { Component } from 'react';
import { commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import cn from 'classnames';
import AddCommentMutation from 'mutations/AddComment';
import environment from 'relay/environment';
import styles from './Form.scss';

/* eslint-disable react/prop-types */

const getDefaultState = () => ({
  author_name: '',
  author_email: '',
  author_url: '',
  content: '',
});

export default class Form extends Component {
  static defaultProps = {
    replyTo: 0,
  };

  constructor(props) {
    super(props);

    this.state = {
      comment: getDefaultState(),
    };
  }

  getOptimisticResponse = () => ({
    addComment: {
      comment: {
        id: null,
        author_name: this.state.comment.author_name,
        author_email: this.state.comment.author_email,
        author_url: this.state.comment.author_url,
        date: new Date().toISOString(),
        content: {
          rendered: `<p>${this.state.comment.content}</p>`,
        },
        author_avatar_urls: [
          {
            size: 48,
            url: 'http://2.gravatar.com/avatar/hash?s=48&d=mm&r=g',
          },
        ],
        parent: this.props.replyTo,
      },
      status: 'new',
      cookies: '',
    },
  });

  updateConnection = (store) => {
    const payload = store.getRootField('addComment');
    const newComment = payload.getLinkedRecord('comment');
    const storeRoot = store.get(this.props.post);
    const connection = ConnectionHandler.getConnection(storeRoot, 'Single_comments');
    const newEdge = ConnectionHandler.createEdge(store, connection, newComment, 'CommentEdge');
    ConnectionHandler.insertEdgeBefore(connection, newEdge);
  };

  onClick = (e) => {
    e.preventDefault();
    e.currentTarget.blur();

    const variables = {
      input: {
        ...this.state.comment,
        post: this.props.post,
        parent: this.props.replyTo,
      },
    };

    commitMutation(environment, {
      mutation: AddCommentMutation,
      variables,
      onCompleted: (response) => {
        if (response.addComment) {
          this.setState({
            comment: getDefaultState(),
          });
        }
      },
      // eslint-disable-next-line no-console
      onError: err => console.error(err),
      updater: this.updateConnection,
      optimisticUpdater: this.updateConnection,
      optimisticResponse: this.getOptimisticResponse,
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

  onCancel = () => {
    this.props.setReplyTo(null);
  };

  render() {
    const fields = {
      author_name: 'Name',
      author_email: 'Email',
      author_url: 'URL',
    };

    return (
      <form className={styles.form} onSubmit={e => e.preventDefault()}>
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
        {this.props.replyTo
          ? <button
            type="reset"
            className={cn(styles.button, styles.reset)}
            onClick={this.onCancel}
          >
              Cancel
            </button>
          : null}
      </form>
    );
  }
}
