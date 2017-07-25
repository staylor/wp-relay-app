import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, SectionList } from 'react-native';
import { QueryRenderer } from 'react-relay';
import environment from './relay/environment';
import HomeQuery from './queries/Home';

export default class Home extends Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={HomeQuery}
        variables={{}}
        render={({ error, props }) => {
          if (error) {
            return (
              <View>
                <Text>
                  {error.message}
                </Text>
                {this.props.children}
              </View>
            );
          } else if (props) {
            return (
              <View style={{ flex: 1 }}>
                <SectionList
                  keyExtractor={item => item.cursor}
                  renderSectionHeader={({ section }) =>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 24,
                          paddingTop: 10,
                          paddingBottom: 10,
                        }}
                      >
                        {section.title}
                      </Text>
                    </View>}
                  renderItem={({ item }) =>
                    <View style={{ flex: 1 }}>
                      <Text style={{ marginTop: 10 }}>
                        {item.node.title.rendered}
                      </Text>
                    </View>}
                  sections={[
                    { data: props.viewer.stickies.edges, title: 'Latest' },
                    {
                      data: props.viewer.readThis.edges,
                      title: 'Read This',
                    },
                    {
                      data: props.viewer.watchThis.edges,
                      title: 'Watch This',
                    },
                    {
                      data: props.viewer.listenToThis.edges,
                      title: 'Listen to This',
                    },
                  ]}
                />
              </View>
            );
          }
          return <ActivityIndicator />;
        }}
      />
    );
  }
}
