import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Route } from 'react-router-native';
import { QueryRenderer } from 'react-relay';
import environment from './relay/environment';
import WrapperQuery from './queries/Wrapper';
import Header from './Header';
import Home from './Home';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default class Wrapper extends Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={WrapperQuery}
        variables={{
          menuID: 'TmF2TWVudToy',
        }}
        render={({ error, props }) => {
          if (error) {
            return (
              <View style={styles.container}>
                <Text>
                  {error.message}
                </Text>
                {this.props.children}
              </View>
            );
          } else if (props) {
            return (
              <View style={styles.container}>
                <Header settings={props.viewer.settings} navMenu={props.viewer.navMenu} />
                <Route path="/" component={Home} />
              </View>
            );
          }
          return <ActivityIndicator />;
        }}
      />
    );
  }
}
