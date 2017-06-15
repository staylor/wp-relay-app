import { graphql } from 'react-relay';

export default graphql`
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
`;
