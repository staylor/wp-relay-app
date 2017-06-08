import React, { Component } from 'react';
import { graphql } from 'react-relay';
import FragmentContainer from 'decorators/FragmentContainer';
import Archive from 'components/Archive';
import styles from './Author.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@FragmentContainer(graphql`
  fragment Author_viewer on Viewer {
    author(id: $id) {
      id
      name
    }
    posts(author: $id) {
      ...Archive_posts
    }
  }
`)
export default class Author extends Component {
  render() {
    const { author, posts } = this.props.viewer;
    return (
      <div className={styles.sections}>
        <section>
          <h3>{author.name}</h3>
          <Archive posts={posts} />
        </section>
      </div>
    );
  }
}
