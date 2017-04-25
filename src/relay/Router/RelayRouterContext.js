import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Relay from 'react-relay';
import QueryAggregator from './QueryAggregator';

/* eslint-disable react/forbid-prop-types */

export default class RelayRouterContext extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = {
    queryAggregator: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.queryAggregator = new QueryAggregator(props);
  }

  getChildContext() {
    return {
      queryAggregator: this.queryAggregator,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location === this.props.location) {
      return;
    }

    this.queryAggregator.updateQueryConfig(nextProps);
  }

  renderCallback = (renderArgs) => {
    this.queryAggregator.setRenderArgs(renderArgs);
    return this.props.children;
  };

  render() {
    return (
      <Relay.Renderer
        {...this.props}
        Container={this.queryAggregator}
        render={this.renderCallback}
        queryConfig={this.queryAggregator.queryConfig}
      />
    );
  }
}
