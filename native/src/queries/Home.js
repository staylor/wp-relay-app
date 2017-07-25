import { graphql } from 'react-relay';

export default graphql`
  query Home_Query(
    $stickiesTotal: Int = 2
    $watchThisTotal: Int = 5
    $readThisTotal: Int = 5
    $listenToThisTotal: Int = 5
  ) {
    viewer {
      stickies: posts(sticky: true, first: $stickiesTotal) @connection(key: "Home_stickies") {
        edges {
          node {
            id
            title {
              rendered
            }
          }
          cursor
        }
      }
      readThis: posts(category: "read-this", sticky: false, first: $readThisTotal)
        @connection(key: "Home_readThis") {
        edges {
          node {
            id
            title {
              rendered
            }
          }
          cursor
        }
      }
      watchThis: posts(category: "watch-this", first: $watchThisTotal)
        @connection(key: "Home_watchThis") {
        edges {
          node {
            id
            title {
              rendered
            }
          }
          cursor
        }
      }
      listenToThis: posts(category: "listen-to-this", first: $listenToThisTotal)
        @connection(key: "Home_listenToThis") {
        edges {
          node {
            id
            title {
              rendered
            }
          }
          cursor
        }
      }
    }
  }
`;
