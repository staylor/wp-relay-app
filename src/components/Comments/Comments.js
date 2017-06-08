import React from 'react';
import PropTypes from 'prop-types';
import { Walker } from 'components/Comments';
import { CommentConnectionType } from 'components/Comments/types';
import styles from './Comments.scss';

export default function Comments({ post, comments }) {
  return (
    <aside className={styles.comments}>
      <h3>Comments</h3>
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
