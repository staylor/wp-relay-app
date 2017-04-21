import { graphql } from 'react-relay';

export default graphql`
  query Page_Query($slug: String!) {
    page(slug: $slug) {
      ...Page_page
    }
  }
`;
