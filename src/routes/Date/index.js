import React from 'react';
import PropTypes from 'prop-types';
import { graphql, createPaginationContainer } from 'react-relay';
import Helmet from 'react-helmet';
import { ContentWrapper, Heading } from 'wp-styled-components';
import DateQuery from 'queries/Date';
import Archive from 'containers/Archive';
import { SITE_URL } from 'utils/constants';

const DateRoute = ({ params, viewer: { posts }, relay }) => {
  const values = [params.month, params.day, params.year].filter(value => value);
  const path = values.join('/');
  const title = `Archives: ${path}`;

  return (
    <ContentWrapper>
      <Helmet>
        <title>
          {title}
        </title>
        <link rel="canonical" href={`${SITE_URL}/${path}`} />
      </Helmet>
      <Heading>
        {title}
      </Heading>
      <Archive {...{ posts, relay }} />
    </ContentWrapper>
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

export default createPaginationContainer(
  DateRoute,
  graphql`
    fragment Date_viewer on Viewer {
      posts(year: $year, month: $month, day: $day, after: $cursor, first: $count)
        @connection(key: "Date_posts") {
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
    query: DateQuery,
  }
);
