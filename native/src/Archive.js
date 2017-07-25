import React, { Component } from 'react';
import { StyleSheet, View, ListView, ActivityIndicator } from 'react-native';
import PostLink from './PostLink';

/* eslint-disable react/prop-types */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  list: {
    flex: 1,
  },

  itemLink: {
    flex: 1,
  },

  item: {
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10,
  },

  activity: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },

  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8e8e8e',
  },
});

export default class Archive extends Component {
  dataSource = null;
  state = {
    showLoader: false,
  };

  constructor(props, context) {
    super(props, context);

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.node.id !== r2.node.id,
    });
    this.state = {
      dataSource: this.dataSource.cloneWithRows(props.posts.edges),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.posts.edges.length === nextProps.posts.edges.length) {
      return;
    }

    this.setState({
      dataSource: this.dataSource.cloneWithRows(nextProps.posts.edges),
    });
  }

  render() {
    const { relay } = this.props;

    return (
      <View style={styles.container}>
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={({ node }) => <PostLink post={node} style={styles.item} />}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          onEndReached={() => {
            if (!relay.hasMore()) {
              return;
            }

            if (relay.isLoading()) {
              this.setState({ showLoader: true });
              return;
            }

            relay.loadMore(10, e => {
              if (e) {
                // eslint-disable-next-line no-console
                console.log(e);
              }
              this.setState({ showLoader: false });
            });
          }}
        />
        {this.state.showLoader && <ActivityIndicator color="#000" style={styles.activity} />}
      </View>
    );
  }
}
