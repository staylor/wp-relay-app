import React from 'react';
import PropTypes from 'prop-types';
import PaginationContainer from 'decorators/PaginationContainer';
import AuthorQuery from 'queries/Author';
import AuthorPaginationFragment from 'queries/fragment/Author';
import Archive from 'components/Archive';
import styles from './Author.scss';

const Author = ({ viewer: { author, posts }, relay }) =>
  <div className={styles.sections}>
    <section>
      <h3>{author.name}</h3>
      <Archive {...{ posts, relay }} />
    </section>
  </div>;

Author.propTypes = {
  viewer: PropTypes.shape({
    author: PropTypes.object,
    posts: PropTypes.object,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  relay: PropTypes.object.isRequired,
};

export default PaginationContainer(AuthorPaginationFragment, {
  getVariables(props, { count, cursor }) {
    return {
      id: props.viewer.author.id,
      count,
      cursor,
    };
  },
  query: AuthorQuery,
})(Author);
