import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from 'wp-styled-components';
import { CommentsWrapper } from 'wp-styled-components/lib/Comments';
import Walker from 'components/Comments/Walker';
import { CommentConnectionType } from 'components/Comments/types';

export default function Comments({ post, comments }) {
  return (
    <CommentsWrapper>
      <Heading>Comments</Heading>
      <Walker post={post} comments={comments} />
    </CommentsWrapper>
  );
}

Comments.propTypes = {
  post: PropTypes.string.isRequired,
  comments: CommentConnectionType,
};

Comments.defaultProps = {
  comments: null,
};
