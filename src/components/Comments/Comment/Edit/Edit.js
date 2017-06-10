import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UpdateCommentMutation from 'mutations/UpdateComment';
import { CommentType } from 'components/Comments/types';
import styles from './Edit.scss';

export default class Edit extends Component {
  static contextTypes = {
    relay: PropTypes.object.isRequired,
  };

  static propTypes = {
    comment: CommentType.isRequired,
    onEditSubmit: PropTypes.func.isRequired,
  };

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

    UpdateCommentMutation.commit(this.props.comment, this.context.relay.environment, variables);
  };

  onChange = e => {
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
        <button type="submit" className={styles.button} onClick={this.onEdit}>
          Submit
        </button>
        <button type="reset" className={styles.cancel} onClick={this.props.onEditSubmit}>
          Cancel
        </button>
      </form>
    );
  }
}
