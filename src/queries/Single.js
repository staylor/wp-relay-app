import { graphql } from 'react-relay';

export default graphql`
  query Single_Query($slug: String!) {
    viewer {
      ...Single_viewer
    }
  }
`;
