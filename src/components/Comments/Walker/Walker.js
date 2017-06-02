import React, { Component } from 'react';
import cn from 'classnames';
import { Form, Comment } from 'components/Comments';
import styles from './Walker.scss';

/* eslint-disable react/prop-types */

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

    Object.keys(nested).forEach((key) => {
      nested[key].reverse();
    });

    return nested;
  }

  parseComment(comment) {
    const { id } = comment;
    if (this.sorted[id]) {
      this.level += 1;
    }

    const active = this.props.replyTo === id;

    return (
      <li key={id} className={cn(styles.comment, styles[`level${this.level}`])}>
        <Comment comment={comment} active={active} setReplyTo={this.props.setReplyTo} />
        {this.sorted[id] ? this.walk(this.sorted[id]) : null}
        {active
          ? <Form post={this.props.post} replyTo={id} setReplyTo={this.props.setReplyTo} />
          : null}
      </li>
    );
  }

  walk(node) {
    return (
      <ul className={this.level ? styles.nested : null}>
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
    const { comments: { edges } } = this.props;
    this.sorted = this.constructor.sortComments(edges);
    return (
      <div>
        {this.walk(this.sorted.top)}
        {!this.props.replyTo && <Form post={this.props.post} setReplyTo={this.props.setReplyTo} />}
      </div>
    );
  }
}
