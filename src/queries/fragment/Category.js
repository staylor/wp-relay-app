import { graphql } from 'react-relay';

export default graphql`
  fragment Category_viewer on Viewer {
    category(slug: $slug) {
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
    posts(category: $slug, after: $cursor, first: $count) @connection(key: "Category_posts") {
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
`;
