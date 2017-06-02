import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { graphql, commitMutation } from 'react-relay';
import { withCookies, Cookies } from 'react-cookie';
import FragmentContainer from 'decorators/FragmentContainer';
import withIntl from 'decorators/withIntl';
import UpdateCommentMutation from 'mutations/UpdateComment';
import environment from 'relay/environment';
import { AUTHOR_NAME_COOKIE, AUTHOR_EMAIL_COOKIE, AUTHOR_URL_COOKIE } from 'components/Comments';
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
    }
    author_avatar_urls {
      size
      url
    }
    parent
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
    content: '',
  };

  onClick = (id) => {
    if (this.props.active) {
      this.props.setReplyTo(null);
    } else {
      this.props.setReplyTo(id);
    }
  };

  getOptimisticResponse = () => ({
    updateComment: {
      comment: {
        ...this.props.comment,
        content: {
          rendered: `<p>${this.state.content}</p>`,
        },
      },
      status: 'new',
      cookies: '',
    },
  });

  onEditClick = () => {
    this.setState({
      editing: true,
      content: this.props.comment.content.rendered,
    });
  };

  onEdit = () => {
    const variables = {
      input: {
        id: this.props.comment.id,
        content: this.state.content,
      },
    };

    commitMutation(environment, {
      mutation: UpdateCommentMutation,
      variables,
      // eslint-disable-next-line no-console
      onError: err => console.error(err),
      optimisticResponse: this.getOptimisticResponse,
    });

    this.setState({ editing: false });
  };
  onDelete = () => {};

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
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
        {
          // this.state.editing
          // ? <div>
          //   <textarea
          //     rows="6"
          //     name="content"
          //     value={this.state.content}
          //     onChange={this.onChange}
          //   />
          //   <button onClick={this.onEdit}>Submit</button>
          // </div>
          // : <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
        }
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
        <button
          className={cn(styles.reply, {
            [styles.active]: this.props.active,
          })}
          onClick={() => this.onClick(id)}
        >
          ↵
        </button>
        {
          // this.viewerOwns() &&
          // <div className={styles.actions}>
          //   <button className={styles.edit} onClick={this.onEditClick}>Edit</button>
          //   <button className={styles.deletion} onClick={this.onDelete}>Delete</button>
          // </div>
        }
      </div>
    );
  }
}
