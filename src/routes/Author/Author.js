import React, { Component } from 'react';
import { graphql } from 'react-relay';
import FragmentContainer from 'decorators/FragmentContainer';
import AuthorArchive from './AuthorArchive';
import styles from './Author.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@FragmentContainer(graphql`
  fragment Author_author on User {
    id
    name
  }
`)
export default class Author extends Component {
  render() {
    const { author } = this.props;
    return (
      <div className={styles.sections}>
        <section>
          <h3>{author.name}</h3>
          <AuthorArchive id={author.id} />
        </section>
      </div>
    );
  }
}
