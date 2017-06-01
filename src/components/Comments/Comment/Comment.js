import React, { Component } from 'react';
import { graphql } from 'react-relay';
import FragmentContainer from 'decorators/FragmentContainer';
import withIntl from 'decorators/withIntl';
import styles from './Comment.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@FragmentContainer(graphql`
  fragment Comment_comment on Comment {
    author_name
    author_url
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
export default class Comment extends Component {
  render() {
    const {
      comment: {
        date,
        author_url: authorUrl,
        author_name: authorName,
        author_avatar_urls: avatarUrls,
        content: { rendered: content },
      },
    } = this.props;
    const avatar = avatarUrls && avatarUrls.find(data => data.size === 48);

    return (
      <div>
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
        <div
          className={styles.content}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    );
  }
}
