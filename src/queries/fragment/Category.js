import { graphql } from 'react-relay';

export default graphql`
  fragment Category_viewer on Viewer {
    category(id: $id) {
      id
      name
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
    posts(category: $id, after: $cursor, first: $count) @connection(key: "Category_posts") {
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
