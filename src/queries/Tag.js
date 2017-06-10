import { graphql } from 'react-relay';

export default graphql`
  query Tag_Query($id: ID!, $cursor: String, $count: Int = 10) {
    viewer {
      ...Tag_viewer
    }
  }
`;
