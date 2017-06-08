import { graphql } from 'react-relay';

export default graphql`
  query Tag_Query($id: ID!) {
    viewer {
      ...Tag_viewer
    }
  }
`;
