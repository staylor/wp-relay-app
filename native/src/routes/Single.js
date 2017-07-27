import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
  },

  imageWrap: {
    flex: 1,
    flexDirection: 'row',
  },

  image: {
    flex: 1,
    width: null,
    height: null,
  },

  tags: {
    flexDirection: 'row',
  },

  tagLabel: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  tag: {
    flex: 1,
    color: '#e50082',
    fontSize: 15,
  },
});

export default createFragmentContainer(
  ({ viewer: { post } }) =>
    <View style={styles.container}>
      <Text style={styles.title}>
        {post.title.raw}
      </Text>
      {post.featuredMedia &&
        post.featuredMedia.source_url &&
        <View style={styles.imageWrap}>
          <Image
            style={styles.image}
            source={{ uri: post.featuredMedia.source_url }}
            resizeMode="contain"
          />
        </View>}
      {post.tags &&
        <View style={styles.tags}>
          <Text style={styles.tagLabel}>Tags: </Text>
          {post.tags.map((tag, i) =>
            <Link key={tag.id} to={`/tag/${tag.slug}`}>
              <Text style={styles.tag}>
                {tag.name}
                {i + 1 === post.tags.length ? null : ', '}
              </Text>
            </Link>
          )}
        </View>}
    </View>,
  graphql`
    fragment Single_viewer on Viewer {
      post(id: $id) {
        id
        date
        title {
          raw
        }
        featuredMedia {
          ... on Image {
            source_url
          }
        }
        tags {
          id
          name
          slug
        }
      }
    }
  `
);
