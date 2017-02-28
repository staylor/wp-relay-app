import React, { Component } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import withIntl from 'decorators/withIntl';
import cn from 'classnames';
import styles from './Comments.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
/* eslint-disable react/style-prop-object */
/* eslint-disable camelcase */

@withRelay({
  initialVariables: {
    total: 10,
  },
  fragments: {
    comments: () => Relay.QL`
      fragment on CommentCollection {
        results(first: $total) {
          edges {
            node {
              id
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
          }
        }
      }
    `,
  },
})
@withIntl
export default class Comments extends Component {
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
    author_url,
    author_name,
    author_avatar_urls,
    content: { rendered: content },
  }) {
    const avatar = author_avatar_urls && author_avatar_urls.find(data => data.size === 48);

    if (this.sorted[id]) {
      this.level += 1;
    }

    return (
      <li key={id} className={cn(styles.comment, styles[`level${this.level}`])}>
        <div className={styles.meta}>
          {avatar ? <img role="presentation" className={styles.image} src={avatar.url} /> : null}
          <span className={styles.author}>
            {author_url ? <a href={author_url}>{author_name}</a> : author_name}
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
    const {
      comments: { results: { edges: comments } },
    } = this.props;

    if (!comments.length) {
      return null;
    }

    this.sorted = this.constructor.sortComments(comments);
    const commentHtml = this.walk(this.sorted.top);

    return (
      <aside className={styles.comments}>
        <h3>Comments</h3>
        <section>{commentHtml}</section>
      </aside>
    );
  }
}
