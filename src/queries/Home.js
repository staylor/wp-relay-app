import { graphql } from 'react-relay';

export default graphql`
  query Home_Query(
    $stickiesTotal: Int = 2,
    $watchThisID: String!,
    $watchThisTotal: Int = 5,
    $readThisID: String!,
    $readThisTotal: Int = 5,
    $listenToThisID: String!,
    $listenToThisTotal: Int = 5,
  ) {
    viewer {
      ...Home_viewer
    }
  }
`;
