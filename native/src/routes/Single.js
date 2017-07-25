import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import { Text, View } from 'react-native';

export default createFragmentContainer(
  ({ viewer, children }) =>
    <View style={{ flex: 1 }}>
      <Text>
        {viewer.post.title.raw}
      </Text>
      {children}
    </View>,
  graphql`
    fragment Single_viewer on Viewer {
      post(id: $id) {
        id
        date
        title {
          raw
        }
        excerpt {
          raw
        }
        tags {
          id
          name
          slug
        }
        comments(post: $id, first: 100) @connection(key: "Single_post_comments") {
          edges {
            node {
              id
              parent
            }
          }
        }
      }
    }
  `
);
