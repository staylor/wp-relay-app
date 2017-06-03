import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Form, Comment } from 'components/Comments';
import { CommentConnectionType } from 'components/Comments/types';
import { sortHierarchy } from 'utils/walker';
import styles from './Walker.scss';

export default class CommentsWalker extends Component {
  static propTypes = {
    post: PropTypes.string.isRequired,
    replyTo: PropTypes.string,
    setReplyTo: PropTypes.func.isRequired,
    comments: CommentConnectionType.isRequired,
  };

  static defaultProps = {
    replyTo: null,
  };

  sorted = null;
  level = 0;

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
    this.sorted = sortHierarchy(edges);
    return (
      <section>
        {this.walk(this.sorted.top)}
        {!this.props.replyTo && <Form post={this.props.post} setReplyTo={this.props.setReplyTo} />}
      </section>
    );
  }
}
