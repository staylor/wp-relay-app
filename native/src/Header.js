import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'react-router-native';
import NavMenu from './NavMenu';

/* eslint-disable react/prop-types */

const styles = StyleSheet.create({
  header: {
    flex: 1,
    padding: 10,
  },
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
      <View style={styles.header}>
        <Link to="/" underlayColor="#fff">
          <Text style={styles.title}>
            {title}
          </Text>
        </Link>
        <Text style={styles.description}>
          {description}
        </Text>
        <NavMenu navMenu={this.props.navMenu} />
      </View>
    );
  }
}
