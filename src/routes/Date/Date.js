import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import Helmet from 'react-helmet';
import PaginationContainer from 'decorators/PaginationContainer';
import DateQuery from 'queries/Date';
import Archive from 'components/Archive';
import { SITE_URL } from 'utils/constants';
import styles from './Date.scss';

const DateRoute = ({ params, viewer: { posts }, relay }) => {
  const values = [params.month, params.day, params.year].filter(value => value);
  const path = values.join('/');
  const title = `Archives: ${path}`;

  return (
    <div className={styles.sections}>
      <Helmet>
        <title>{title}</title>
        <link rel="canonical" href={`${SITE_URL}/${path}`} />
      </Helmet>
      <section>
        <h3 className={styles.label}>{title}</h3>
        <Archive {...{ posts, relay }} />
      </section>
    </div>
  );
};

DateRoute.propTypes = {
  viewer: PropTypes.shape({
    posts: PropTypes.object,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  relay: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  params: PropTypes.object.isRequired,
};

export default PaginationContainer(
  graphql`
    fragment Date_viewer on Viewer {
      posts(year: $year, month: $month, day: $day, after: $cursor, first: $count) @connection(key: "Date_posts") {
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
    query: DateQuery,
  }
)(DateRoute);
