import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavMenu from './NavMenu';

/* eslint-disable react/prop-types */

const styles = StyleSheet.create({
  title: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
  },
});

export default class Header extends Component {
  render() {
    const { title, description } = this.props.settings;

    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>
          {title}
        </Text>
        <Text style={styles.description}>
          {description}
        </Text>
        <NavMenu navMenu={this.props.navMenu} />
      </View>
    );
  }
}
