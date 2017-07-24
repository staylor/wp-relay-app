import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import UpdateCommentMutation from 'mutations/UpdateComment';
import { CommentType } from 'components/Comments/types';
import styles from './styles';

export default class Edit extends Component {
  static contextTypes = {
    relay: PropTypes.object.isRequired,
  };

  static propTypes = {
    comment: CommentType.isRequired,
    token: PropTypes.string.isRequired,
    onEditSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      content: props.comment.content.raw,
    };
  }

  onEdit = e => {
    e.preventDefault();

    this.props.onEditSubmit();

    const variables = {
      input: {
        id: this.props.comment.id,
        content: this.state.content,
        token: this.props.token,
      },
    };

    UpdateCommentMutation.commit(this.context.relay.environment, variables, this.props.comment);
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <form onSubmit={e => e.preventDefault()} className={css(styles.form)}>
        <textarea
          className={css(styles.content)}
          rows="6"
          name="content"
          value={this.state.content}
          onChange={this.onChange}
        />
        <button type="submit" className={css(styles.button)} onClick={this.onEdit}>
          Submit
        </button>
        <button type="reset" className={css(styles.cancel)} onClick={this.props.onEditSubmit}>
          Cancel
        </button>
      </form>
    );
  }
}
