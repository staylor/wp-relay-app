import React, { Component } from 'react';
import Archive from 'components/Archive';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

export default class CategoryArchive extends Component {
  render() {
    return <Archive {...this.props} infinite />;
  }
}
