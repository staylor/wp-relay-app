import React from 'react';
import { applyRouterMiddleware } from 'react-router';
import IsomorphicRelay from 'relay/Isomorphic';
import RouteContainer from 'relay/Router/RouteContainer';
import getRouteQueries from 'relay/Router/utils/getRouteQueries';
import RelayRouterContext from 'relay/Router/RelayRouterContext';

class IsomorphicRelayRouterContext extends RelayRouterContext {
  constructor(props, context) {
    super(props, context);
    if (props.queryAggregator) {
      this.queryAggregator = props.queryAggregator;
    }
  }

  render() {
    return (
      <IsomorphicRelay.Renderer
        {...this.props}
        Container={this.queryAggregator.Container}
        queryConfig={this.queryAggregator.queryConfig}
        render={this.renderCallback}
      />
    );
  }
}

export default applyRouterMiddleware({
  renderRouterContext: (child, props) => (
    <IsomorphicRelayRouterContext {...props}>
      {child}
    </IsomorphicRelayRouterContext>
  ),

  renderRouteComponent: (child, props) => {
    /* eslint-disable react/prop-types */
    const { key, route } = props;
    /* eslint-enable react/prop-types */

    const routeQueries = getRouteQueries(route, props);
    const queries = key ? routeQueries && routeQueries[key] : routeQueries;
    if (!queries) {
      return child;
    }

    return (
      <RouteContainer queries={queries} routerProps={props}>
        {child}
      </RouteContainer>
    );
  },
});
