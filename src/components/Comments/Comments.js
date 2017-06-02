import React, { Component } from 'react';
import { Walker } from 'components/Comments';
import styles from './Comments.scss';

/* eslint-disable react/prop-types */

export default class Comments extends Component {
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
