import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { commitMutation } from 'react-relay';
import { withCookies, Cookies } from 'react-cookie';
import environment from 'relay/environment';
import AddCommentMutation from 'mutations/AddComment';
import styles from './Comments.scss';

@withCookies
export default class CommentsForm extends Component {
  static propTypes = {
    cookies: PropTypes.instanceOf(Cookies).isRequired,
  };

  onClick(e) {
    e.preventDefault();

    const variables = {
      input: {

      },
    };

    commitMutation(
      environment,
      {
        AddCommentMutation,
        variables,
        onCompleted: (response) => {
          console.log('Success!')
        },
        onError: err => console.error(err),
      },
    );
  }

  render() {
    return (
      <form className={styles.form}>
        <p>
          <label htmlFor="author_name">Name:</label>
          <input type="text" name="author_name" />
        </p>
        <p>
          <label htmlFor="author_email">Email:</label>
          <input type="email" name="author_email" />
        </p>
        <p>
          <label htmlFor="author_url">URL:</label>
          <input type="url" name="author_url" />
        </p>
        <p>
          <label htmlFor="content">Comment:</label>
          <textarea rows="6" name="content" />
        </p>
        <button
          type="submit"
          className={styles.button}
          onClick={e => this.onClick(e)}
        >Submit</button>
      </form>
    );
  }
}
