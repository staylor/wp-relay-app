import React, { Component } from 'react';
import { graphql, createPaginationContainer } from 'react-relay';
import { StyleSheet, Text, ListView } from 'react-native';
import { Link } from 'react-router-native';
import TermQuery from '../queries/Term';

/* eslint-disable react/prop-types */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});

class Term extends Component {
  constructor(props, context) {
    super(props, context);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.node.id !== r2.node.id,
    });
    this.state = {
      dataSource: ds.cloneWithRows(props.viewer.posts.edges),
    };
  }

  render() {
    const { term } = this.props.viewer;
    const url = `/${term.taxonomy.rewrite.slug}/${term.slug}`;

    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={({ node }) =>
          <Link to={url} underlayColor="#eee">
            <Text style={styles.item}>
              {node.title.raw}
            </Text>
          </Link>}
      />
    );
  }
}

export default createPaginationContainer(
  Term,
  graphql`
    fragment Term_viewer on Viewer {
      term(slug: $slug, taxonomy: $taxonomy) {
        id
        name
        slug
        taxonomy {
          rewrite {
            slug
          }
          labels {
            singular
            plural
          }
        }
      }
      posts(term: $slug, taxonomy: $taxonomy, after: $cursor, first: $count)
        @connection(key: "Term_posts") {
        edges {
          node {
            id
            title {
              raw
            }
          }
          cursor
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  `,
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.viewer && props.viewer.posts;
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        ...fragmentVariables,
        count,
        cursor,
      };
    },
    getFragmentVariables(vars, totalCount) {
      return {
        ...vars,
        count: totalCount,
      };
    },
    query: TermQuery,
  }
);
