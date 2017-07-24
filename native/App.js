import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { NativeRouter } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
  title: {
    flex: 2,
    backgroundColor: 'red',
    padding: 20,
  },
});

export default class App extends React.Component {
  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
          <Text style={styles.title}>Scott</Text>
          <Button
            style={{ margin: 20, backgroundColor: 'purple' }}
            title="PRESS!"
            color="black"
            onPress={() => Alert.alert('Woooo!')}
          />
          <Text style={{ flex: 3, backgroundColor: 'blue' }}>
            Open up App.js to start working on your app! Open up App.js to start working on your
            app! Open up App.js to start working on your app! Open up App.js to start working on
            your app! Open up App.js to start working on your app! Open up App.js to start working
            on your app! Open up App.js to start working on your app!
          </Text>
          <Text style={{ flex: 1, backgroundColor: 'green' }}>
            Changes you make will automatically reload.
          </Text>
          <Text style={{ flex: 1, backgroundColor: 'yellow' }}>
            Shake your phone to open the developer menu.
          </Text>
        </View>
      </NativeRouter>
    );
  }
}
