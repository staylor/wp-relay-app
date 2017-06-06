import { graphql } from 'react-relay';

export default graphql`
  query Home_Query($watchThisID: String!, $readThisID: String!, $listenToThisID: String!) {
    viewer {
      ...Home_viewer
    }
  }
`;
