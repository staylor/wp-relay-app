import React from 'react';
import PropTypes from 'prop-types';
import { graphql, createPaginationContainer } from 'react-relay';
import AuthorQuery from 'queries/Author';
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

export default createPaginationContainer(
  Author,
  graphql`
    fragment Author_viewer on Viewer {
      author(id: $id) {
        id
        name
      }
      posts(author: $id, after: $cursor, first: $count) @connection(key: "Author_posts") {
        edges {
          node {
            ...Post_post
          }
          cursor
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  `,
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.viewer && props.viewer.posts;
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        ...fragmentVariables,
        count,
        cursor,
      };
    },
    getFragmentVariables(vars, totalCount) {
      return {
        ...vars,
        count: totalCount,
      };
    },
    query: AuthorQuery,
  }
);
