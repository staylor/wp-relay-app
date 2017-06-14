import { graphql } from 'react-relay';

export default graphql`
  fragment Tag_viewer on Viewer {
    tag(id: $id) {
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
    posts(tag: $id, after: $cursor, first: $count) @connection(key: "Tag_posts") {
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
