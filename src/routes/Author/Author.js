import React, { Component } from 'react';
import PaginationContainer from 'decorators/PaginationContainer';
import AuthorQuery from 'queries/Author';
import AuthorPaginationFragment from 'queries/fragment/Author';
import Archive from 'components/Archive';
import styles from './Author.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@PaginationContainer(AuthorPaginationFragment, {
  getVariables(props, { count, cursor }) {
    return {
      id: props.viewer.author.id,
      count,
      cursor,
    };
  },
  query: AuthorQuery,
})
export default class Author extends Component {
  render() {
    const { viewer: { author, posts }, relay } = this.props;
    return (
      <div className={styles.sections}>
        <section>
          <h3>{author.name}</h3>
          <Archive {...{ posts, relay }} />
        </section>
      </div>
    );
  }
}
