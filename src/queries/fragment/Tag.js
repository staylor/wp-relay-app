import { graphql } from 'react-relay';

export default graphql`
  fragment Tag_viewer on Viewer {
    tag(slug: $slug) {
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
    posts(tag: $slug, after: $cursor, first: $count) @connection(key: "Tag_posts") {
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
