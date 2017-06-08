import { graphql } from 'react-relay';

export default graphql`
  query Category_Query($id: ID!) {
    viewer {
      ...Category_viewer
    }
  }
`;
