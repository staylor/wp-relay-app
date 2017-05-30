import React, { Component } from 'react';
import { graphql } from 'react-relay';
import QueryRenderer from 'decorators/QueryRenderer';
import FragmentContainer from 'decorators/FragmentContainer';
import CommentsQuery from 'queries/Comments';
import Walker from './Walker';
import Form from './Form';
import styles from './Comments.scss';

/* eslint-disable react/prop-types */

@QueryRenderer(CommentsQuery)
@FragmentContainer(graphql`
  fragment Comments_comments on CommentCollection {
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
`)
export default class Comments extends Component {

  render() {
    const {
      comments: { results: { edges: comments } },
    } = this.props;

    if (!comments.length) {
      return null;
    }

    return (
      <aside className={styles.comments}>
        <h3>Comments</h3>
        <section>
          <Form />
          <Walker comments={comments} />
        </section>
      </aside>
    );
  }
}
