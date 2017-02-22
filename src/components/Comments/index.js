import React, { Component } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import withIntl from 'decorators/withIntl';
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

    const li = [`<li class="${styles.comment} ${styles[`level${this.level}`]}">
      <div class="${styles.meta}">
        ${avatar ? `<img class="${styles.image}" src="${avatar.url}"/>` : null}
        <span class="${styles.author}">
          ${author_url ? `<a href="${author_url}">${author_name}</a>` : author_name}
        </span>
        <span class="${styles.time}">
          ${this.props.intl.formatRelative(date)}
        </span>
      </div>
      <div class="${styles.content}">${content}</div>`];

    if (this.sorted[id]) {
      this.level += 1;
      li.push(this.walk(this.sorted[id]));
    }

    li.push('</li>');
    return li.join('');
  }

  walk(node) {
    const fragments = ['<ul>'];
    node.forEach((child) => {
      if (!child.parent) {
        this.level = 0;
      }
      const li = this.parseComment(child);
      fragments.push(li);
    });
    fragments.push('</ul>');
    return fragments.join('');
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
        <section dangerouslySetInnerHTML={{ __html: commentHtml }} />
      </aside>
    );
  }
}
