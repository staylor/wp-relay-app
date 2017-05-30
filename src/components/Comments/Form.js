import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import { withCookies, Cookies } from 'react-cookie';
import environment from 'relay/environment';
import AddCommentMutation from 'mutations/AddComment';
import styles from './Comments.scss';

@withCookies
export default class CommentsForm extends Component {
  static contextTypes = {
    postId: PropTypes.string,
  };

  static propTypes = {
    cookies: PropTypes.instanceOf(Cookies).isRequired,
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
        const prevComments = store.getRoot().getLinkedRecord('Comments_results');
        console.log(prevComments);
        const prevEdgeNodes = prevComments && prevComments.getLinkedRecords('edges');
        if (prevEdgeNodes) {
          prevEdgeNodes.push({
            node: payload.getLinkedRecord('comment'),
          });
          prevComments.setLinkedRecords(prevEdgeNodes, 'edges');
        }
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
