import React, { Component } from 'react';
import cn from 'classnames';
import withIntl from 'decorators/withIntl';
import styles from './Comments.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */

@withIntl
export default class CommentsWalker extends Component {
  sorted = null;
  level = 0;

  static sortComments(comments) {
    const nested = {
      top: [],
    };
    comments.forEach(({ node }) => {
      if (!node.parent) {
        nested.top.push(node);
        return;
      }

      if (!nested[node.parent]) {
        nested[node.parent] = [];
      }
      nested[node.parent].push(node);
    });

    nested.top.reverse();

    return nested;
  }
  parseComment({
    id,
    date,
    author_url: authorUrl,
    author_name: authorName,
    author_avatar_urls: avatarUrls,
    content: { rendered: content },
  }) {
    const avatar = avatarUrls && avatarUrls.find(data => data.size === 48);

    if (this.sorted[id]) {
      this.level += 1;
    }

    return (
      <li key={id} className={cn(styles.comment, styles[`level${this.level}`])}>
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
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
        {this.sorted[id] ? this.walk(this.sorted[id]) : null}
      </li>
    );
  }

  walk(node) {
    return (
      <ul>
        {node.map((child) => {
          if (!child.parent) {
            this.level = 0;
          }
          return this.parseComment(child);
        })}
      </ul>
    );
  }

  render() {
    const { comments } = this.props;
    this.sorted = this.constructor.sortComments(comments);
    return this.walk(this.sorted.top);
  }
}
