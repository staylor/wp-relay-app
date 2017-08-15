import { graphql, createFragmentContainer } from 'react-relay';
import Sidebar from 'wp-styled-components/lib/Sidebar';

/* eslint-disable react/no-danger */

export default createFragmentContainer(
  Sidebar,
  graphql`
    fragment Sidebar_sidebar on Sidebar {
      widgets {
        id
        classname
        content {
          rendered
        }
      }
    }
  `
);
