import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import PostLink from '../PostLink';

/* eslint-disable react/prop-types */

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
  },
  item: {
    fontSize: 18,
    marginTop: 5,
    marginBottom: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
});

export default createFragmentContainer(
  ({ viewer }) =>
    <View style={styles.container}>
      <SectionList
        keyExtractor={item => item.cursor}
        renderSectionHeader={({ section }) =>
          <Text style={styles.sectionHeader}>
            {section.title}
          </Text>}
        renderItem={({ item: { node } }) => <PostLink post={node} style={styles.item} />}
        sections={[
          { data: viewer.stickies.edges, title: 'Latest' },
          {
            data: viewer.readThis.edges,
            title: 'Read This',
          },
          {
            data: viewer.watchThis.edges,
            title: 'Watch This',
          },
          {
            data: viewer.listenToThis.edges,
            title: 'Listen to This',
          },
        ]}
      />
    </View>,
  graphql`
    fragment Home_viewer on Viewer {
      stickies: posts(sticky: true, first: $stickiesTotal) @connection(key: "Home_stickies") {
        edges {
          node {
            id
            ...PostLink_post
          }
          cursor
        }
      }
      readThis: posts(category: "read-this", sticky: false, first: $readThisTotal)
        @connection(key: "Home_readThis") {
        edges {
          node {
            id
            ...PostLink_post
          }
          cursor
        }
      }
      watchThis: posts(category: "watch-this", first: $watchThisTotal)
        @connection(key: "Home_watchThis") {
        edges {
          node {
            id
            ...PostLink_post
          }
          cursor
        }
      }
      listenToThis: posts(category: "listen-to-this", first: $listenToThisTotal)
        @connection(key: "Home_listenToThis") {
        edges {
          node {
            id
            ...PostLink_post
          }
          cursor
        }
      }
    }
  `
);
