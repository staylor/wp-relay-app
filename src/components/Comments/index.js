import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import Walker from 'components/Comments/Walker';
import { CommentConnectionType } from 'components/Comments/types';
import styles from './styles';

export default function Comments({ post, comments }) {
  return (
    <aside className={css(styles.comments)}>
      <h2 className={css(styles.header)}>Comments</h2>
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
