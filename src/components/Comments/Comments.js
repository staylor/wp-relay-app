import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Walker } from 'components/Comments';
import { CommentConnectionType } from 'components/Comments/types';
import styles from './Comments.scss';

export default class Comments extends Component {
  static propTypes = {
    post: PropTypes.string.isRequired,
    comments: CommentConnectionType.isRequired,
  };

  state = {
    replyTo: null,
  };

  setReplyTo = (id) => {
    this.setState({ replyTo: id });
  };

  render() {
    const { post, comments } = this.props;

    return (
      <aside className={styles.comments}>
        <h3>Comments</h3>
        <Walker
          setReplyTo={this.setReplyTo}
          post={post}
          comments={comments}
          replyTo={this.state.replyTo}
        />
      </aside>
    );
  }
}
