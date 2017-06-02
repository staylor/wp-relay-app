import React, { Component } from 'react';
import UpdateCommentMutation from 'mutations/Comment/UpdateComment';
import styles from './Edit.scss';

/* eslint-disable react/prop-types */

export default class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: props.comment.content.raw,
    };
  }

  onEdit = () => {
    this.props.onEditSubmit();

    const variables = {
      input: {
        id: this.props.comment.id,
        content: this.state.content,
      },
    };

    UpdateCommentMutation.commit(this.props.comment, variables);
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <form onSubmit={e => e.preventDefault()} className={styles.form}>
        <textarea
          className={styles.content}
          rows="6"
          name="content"
          value={this.state.content}
          onChange={this.onChange}
        />
        <button type="submit" className={styles.button} onClick={this.onEdit}>Submit</button>
        <button type="reset" className={styles.cancel} onClick={this.props.onEditComplete}>
          Cancel
        </button>
      </form>
    );
  }
}
