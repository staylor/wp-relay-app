import React from 'react';
import PropTypes from 'prop-types';
import { graphql, createPaginationContainer } from 'react-relay';
import Helmet from 'react-helmet';
import { ContentWrapper, Heading } from 'wp-styled-components';
import TermQuery from 'queries/Term';
import Archive from 'components/Archive';
import Error from 'components/Error';
import { SITE_URL } from 'utils/constants';

const Term = ({ viewer: { term, posts }, relay }) => {
  if (!term) {
    return <Error />;
  }

  const title = `${term.taxonomy.labels.singular}: ${term.name}`;
  const url = `${SITE_URL}/${term.taxonomy.rewrite.slug}/${term.slug}`;

  return (
    <ContentWrapper>
      <Helmet>
        <title>
          {title}
        </title>
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
      </Helmet>
      <Heading>
        {title}
      </Heading>
      <Archive {...{ posts, relay }} />
    </ContentWrapper>
  );
};

Term.propTypes = {
  viewer: PropTypes.shape({
    term: PropTypes.object,
    posts: PropTypes.object,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  relay: PropTypes.object.isRequired,
};

export default createPaginationContainer(
  Term,
  graphql`
    fragment Term_viewer on Viewer {
      term(slug: $slug, taxonomy: $taxonomy) {
        id
        name
        slug
        taxonomy {
          rewrite {
            slug
          }
          labels {
            singular
            plural
          }
        }
      }
      posts(term: $slug, taxonomy: $taxonomy, after: $cursor, first: $count)
        @connection(key: "Term_posts") {
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
    query: TermQuery,
  }
);
