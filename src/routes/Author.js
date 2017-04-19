import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Archive from 'components/Archive';
import styles from './scss/Author.scss';

/* eslint-disable react/prop-types */

const Author = () => {
  const { user, posts } = this.props;
  return (
    <div className={styles.sections}>
      <section>
        <h3>{user.name}</h3>
        <Archive posts={posts} />
      </section>
    </div>
  );
};

export default createFragmentContainer(Author, {
  author: graphql`
    fragment Author_author on User {
      name
    }
  `,
  posts: graphql`
    fragment Author_posts on PostCollection {
      ...Archive_posts
    }
  `,
});
