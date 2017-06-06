import React, { Component } from 'react';
import Archive from 'components/Archive';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

export default class TagArchive extends Component {
  render() {
    const { posts } = this.props;
    return <Archive posts={posts} />;
  }
}
