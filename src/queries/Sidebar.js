import { graphql } from 'react-relay';

export default graphql`
  query Sidebar_Query($id: ID!) {
    sidebar(id: $id) {
      ...Sidebar_sidebar
    }
  }
`;
