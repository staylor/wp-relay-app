import React, { Component } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import { FormattedRelative } from 'react-intl';
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
export default class Comments extends Component {
  sorted = null;

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
    author_url,
    author_name,
    content: { rendered: content },
  }) {
    const li = [`<li class=${styles.comment}>
      <span class=${styles.author}>
        ${author_url ? `<a href=${author_url}>${author_name}</a>` : author_name}
      </span>
      <div class=${styles.content}>${content}</div>`];

    if (this.sorted[id]) {
      li.push(this.walk(this.sorted[id]));
    }

    li.push('</li>');
    return li.join('');
  }

  walk(node) {
    const fragments = [`<ul class=${styles.levels}>`];
    node.forEach((child) => {
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
      <section className={styles.comments}>
        <h3>Comments</h3>
        <div dangerouslySetInnerHTML={{ __html: commentHtml }} />
      </section>
    );
  }
}
