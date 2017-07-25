import React, { Component } from 'react';
import { graphql, createPaginationContainer } from 'react-relay';
import { StyleSheet, Text, ListView } from 'react-native';
import { Link } from 'react-router-native';
import DateQuery from '../queries/Date';
import { dateRegex } from '../utils/regex';

/* eslint-disable react/prop-types */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});

class DateRoute extends Component {
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
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={({ node }) => {
          const [, year, month, day] = dateRegex.exec(node.date);
          const url = `/${year}/${month}/${day}/${node.id}`;
          return (
            <Link to={url} underlayColor="#eee">
              <Text style={styles.item}>
                {node.title.raw}
              </Text>
            </Link>
          );
        }}
      />
    );
  }
}

export default createPaginationContainer(
  DateRoute,
  graphql`
    fragment Date_viewer on Viewer {
      posts(year: $year, month: $month, day: $day, after: $cursor, first: $count)
        @connection(key: "Date_posts") {
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
    query: DateQuery,
  }
);
