import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'md5';
import { graphql } from 'react-relay';
import { withCookies, Cookies } from 'react-cookie';
import { intlShape } from 'react-intl';
import { css } from 'glamor';
import FragmentContainer from 'decorators/FragmentContainer';
import withIntl from 'decorators/withIntl';
import { AUTHOR_EMAIL_COOKIE } from 'components/Comments/constants';
import { CommentType } from 'components/Comments/types';
import DeleteCommentMutation from 'mutations/DeleteComment';
import EditComment from './Edit';
import styles from './styles';

/* eslint-disable react/no-danger */
/* eslint-disable react/forbid-prop-types */

@FragmentContainer(graphql`
  fragment Comment_comment on Comment {
    id
    author_name
    author_url
    author_hash
    date
    content {
      rendered
      raw
    }
    author_avatar_urls {
      size
      url
    }
    parent
    post
  }
`)
@withIntl
@withCookies
export default class Comment extends Component {
  static propTypes = {
    cookies: PropTypes.instanceOf(Cookies).isRequired,
    active: PropTypes.bool.isRequired,
    setReplyTo: PropTypes.func.isRequired,
    comment: CommentType.isRequired,
    intl: intlShape.isRequired,
    relay: PropTypes.object.isRequired,
  };

  editToken = null;

  state = {
    editing: false,
  };

  onClick = id => {
    if (this.props.active) {
      this.props.setReplyTo(null);
    } else {
      this.props.setReplyTo(id);
    }
  };

  onEditClick = () => {
    this.setState({
      editing: true,
    });
  };

  onEditSubmit = () => {
    this.setState({
      editing: false,
    });
  };

  onDelete = () => {
    DeleteCommentMutation.commit(this.props.relay.environment, {
      comment: this.props.comment,
      token: this.editToken,
    });
  };

  viewerOwns() {
    const { comment, cookies } = this.props;
    const authorEmail = cookies.get(AUTHOR_EMAIL_COOKIE);
    if (!authorEmail) {
      return false;
    }
    const tokenKey = encodeURIComponent(`token_${comment.id}`);
    this.editToken = cookies.get(tokenKey);
    if (!this.editToken) {
      return false;
    }
    const values = md5(`${comment.id}${authorEmail}`);
    return values === this.props.comment.author_hash;
  }

  render() {
    const {
      comment: {
        id,
        date,
        author_url: authorUrl,
        author_name: authorName,
        author_avatar_urls: avatarUrls,
        content: { rendered: content },
      },
    } = this.props;
    const avatar = avatarUrls && avatarUrls.find(data => data.size === 48);
    let authorDisplay = authorName;
    if (authorUrl) {
      authorDisplay = (
        <a href={authorUrl}>
          {authorName}
        </a>
      );
    }

    let commentContent = null;
    if (this.state.editing) {
      commentContent = (
        <EditComment
          token={this.editToken}
          comment={this.props.comment}
          onEditSubmit={this.onEditSubmit}
        />
      );
    } else {
      commentContent = (
        <div className={css(styles.content)} dangerouslySetInnerHTML={{ __html: content }} />
      );
    }

    return (
      <div className={css(styles.comment)}>
        <div className={css(styles.meta)}>
          {avatar ? <img alt="" className={css(styles.image)} src={avatar.url} /> : null}
          <span className={css(styles.author)}>
            {authorDisplay}
          </span>
          <span className={css(styles.time)}>
            {this.props.intl.formatRelative(date)}
          </span>
        </div>
        {commentContent}
        <button
          className={css(styles.reply, this.props.active && styles.active)}
          onClick={() => this.onClick(id)}
        >
          ↵
        </button>
        {this.viewerOwns() &&
          !this.state.editing &&
          <div className={css(styles.actions)}>
            <button className={css(styles.edit)} onClick={this.onEditClick}>
              Edit
            </button>
            <button className={css(styles.deletion)} onClick={this.onDelete}>
              Delete
            </button>
          </div>}
      </div>
    );
  }
}
