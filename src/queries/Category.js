import { graphql } from 'react-relay';

export default graphql`
  query Category_Query($id: ID!, $cursor: String, $count: Int = 10) {
    viewer {
      ...Category_viewer
    }
  }
`;
