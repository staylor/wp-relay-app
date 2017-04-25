import PropTypes from 'prop-types';
import React from 'react';
import StaticContainer from 'react-static-container';
import mergeRouteParams from './utils/mergeRouteParams';

/* eslint-disable react/forbid-prop-types */

function RouteContainer(
  { queries, routerProps, children, ...extraProps },
  { queryAggregator }
) {
  const { key, route, routes } = routerProps;

  let params = {};
  for (const ancestorRoute of routes) {
    params = mergeRouteParams(params, ancestorRoute, routerProps);

    if (ancestorRoute === route) {
      break;
    }
  }

  const renderArgs =
    queryAggregator.getRenderArgs(route, key, queries, params);

  const { props } = renderArgs;

  let { render } = route;
  if (render && typeof render === 'object') {
    render = render[key];
  }

  // The below is largely copied from RelayReadyStateRenderer.

  let element = null;
  let shouldUpdate = false;
  if (render) {
    element = render.call(route, {
      ...renderArgs,
      props: props && {
        ...routerProps,
        ...extraProps,
        ...params,
        ...props,
      },
      routerProps: {
        ...routerProps,
        ...extraProps,
      },
      element: children,
    });
  } else if (props) {
    // The child already has routerProps, so just inject the additional props.
    element = React.cloneElement(children, {
      ...extraProps,
      ...params,
      ...props,
    });
  }

  if (element) {
    shouldUpdate = true;
  }

  return (
    <StaticContainer shouldUpdate={shouldUpdate}>
      {element}
    </StaticContainer>
  );
}

RouteContainer.propTypes = {
  queries: PropTypes.object.isRequired,
  routerProps: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};
RouteContainer.contextTypes = {
  queryAggregator: PropTypes.object.isRequired,
};

export default RouteContainer;
