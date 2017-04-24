import { graphql } from 'react-relay';

export default graphql`
  query SidebarQuery($id: ID!) {
    sidebar(id: $id) {
      widgets {
        classname
        content {
          rendered
        }
      }
    }
  }
`;
