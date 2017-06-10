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
    comments: CommentConnectionType,
  };

  static defaultProps = {
    comments: null,
  };

  state = {
    replyTo: null,
  };

  setReplyTo = id => {
    this.setState({ replyTo: id });
  };

  sorted = null;
  level = 0;

  parseComment(comment) {
    const { id } = comment;
    if (this.sorted[id]) {
      this.level += 1;
    }

    const active = this.state.replyTo === id;

    return (
      <li key={id} className={cn(styles.comment, styles[`level${this.level}`])}>
        <Comment comment={comment} active={active} setReplyTo={this.setReplyTo} />
        {this.sorted[id] ? this.walk(this.sorted[id]) : null}
        {active ? <Form post={this.props.post} replyTo={id} setReplyTo={this.setReplyTo} /> : null}
      </li>
    );
  }

  walk(node) {
    return (
      <ul className={this.level ? styles.nested : null}>
        {node.map(child => {
          if (!child.parent) {
            this.level = 0;
          }
          return this.parseComment(child);
        })}
      </ul>
    );
  }

  render() {
    if (!this.props.comments) {
      return (
        <section>
          {<Form post={this.props.post} setReplyTo={this.setReplyTo} />}
        </section>
      );
    }

    const { comments: { edges } } = this.props;
    this.sorted = sortHierarchy(edges);
    this.level = 0;
    return (
      <section>
        {this.walk(this.sorted.top)}
        {!this.state.replyTo && <Form post={this.props.post} setReplyTo={this.setReplyTo} />}
      </section>
    );
  }
}
