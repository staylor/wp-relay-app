import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { graphql } from 'react-relay';
import { withCookies, Cookies } from 'react-cookie';
import FragmentContainer from 'decorators/FragmentContainer';
import withIntl from 'decorators/withIntl';
import { AUTHOR_NAME_COOKIE, AUTHOR_EMAIL_COOKIE, AUTHOR_URL_COOKIE } from 'components/Comments';
import DeleteCommentMutation from 'mutations/Comment/DeleteComment';
import EditComment from './Edit/Edit';
import styles from './Comment.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-danger */

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
    post {
      id
    }
  }
`)
@withIntl
@withCookies
export default class Comment extends Component {
  static propTypes = {
    cookies: PropTypes.instanceOf(Cookies).isRequired,
  };

  state = {
    editing: false,
  };

  onClick = (id) => {
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
    DeleteCommentMutation.commit(this.props.comment);
  };

  viewerOwns() {
    const { cookies } = this.props;
    const authorName = cookies.get(AUTHOR_NAME_COOKIE);
    const authorEmail = cookies.get(AUTHOR_EMAIL_COOKIE);
    const authorURL = cookies.get(AUTHOR_URL_COOKIE);
    const values = `${authorName}${authorEmail}${authorURL}`;
    if (!values) {
      return false;
    }
    return btoa(values) === this.props.comment.author_hash;
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

    return (
      <div className={styles.comment}>
        <div className={styles.meta}>
          {avatar
            ? <img alt="" role="presentation" className={styles.image} src={avatar.url} />
            : null}
          <span className={styles.author}>
            {authorUrl ? <a href={authorUrl}>{authorName}</a> : authorName}
          </span>
          <span className={styles.time}>
            {this.props.intl.formatRelative(date)}
          </span>
        </div>
        {this.state.editing
          ? <EditComment comment={this.props.comment} onEditSubmit={this.onEditSubmit} />
          : <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />}
        <button
          className={cn(styles.reply, {
            [styles.active]: this.props.active,
          })}
          onClick={() => this.onClick(id)}
        >
          ↵
        </button>
        {this.viewerOwns() &&
          !this.state.editing &&
          <div className={styles.actions}>
            <button className={styles.edit} onClick={this.onEditClick}>Edit</button>
            <button className={styles.deletion} onClick={this.onDelete}>Delete</button>
          </div>}
      </div>
    );
  }
}
