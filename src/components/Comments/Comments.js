import React from 'react';
import PropTypes from 'prop-types';
import { Walker } from 'components/Comments';
import { CommentConnectionType } from 'components/Comments/types';
import styles from './Comments.scss';

export default function Comments({ post, comments }) {
  return (
    <aside className={styles.comments}>
      <h2 className={styles.header}>Comments</h2>
      <Walker post={post} comments={comments} />
    </aside>
  );
}

Comments.propTypes = {
  post: PropTypes.string.isRequired,
  comments: CommentConnectionType,
};

Comments.defaultProps = {
  comments: null,
};
