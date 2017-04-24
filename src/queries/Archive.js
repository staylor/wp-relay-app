import { graphql } from 'react-relay';

export default graphql`
  query Archive_Query($total: Int) {
    posts {
      results(first: $total) {
        edges {
          node {
            id
            title {
              rendered
            }
            content {
              rendered
            }
            excerpt {
              rendered
            }
            featured_media {
              __typename
              ... on Image {
                source_url
                media_details {
                  sizes {
                    name
                    source_url
                  }
                }
              }
            }
          }
          cursor
        }
      }
    }
  }
`;
