import { graphql } from 'react-relay';

export default graphql`
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
`;
