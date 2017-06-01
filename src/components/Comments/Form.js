import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import AddCommentMutation from 'mutations/AddComment';
import environment from 'relay/environment';
import styles from './Comments.scss';

/* eslint-disable react/prop-types */

export default class Form extends Component {
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

    commitMutation(environment, {
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
        const newComment = payload.getLinkedRecord('comment');
        const storeRoot = store.get(this.context.postId);
        const connection = ConnectionHandler.getConnection(storeRoot, 'Single_comments');
        const newEdge = ConnectionHandler.createEdge(store, connection, newComment, 'CommentEdge');
        ConnectionHandler.insertEdgeAfter(connection, newEdge);
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

    return (
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
    );
  }
}
