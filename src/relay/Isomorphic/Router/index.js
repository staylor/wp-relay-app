import IsomorphicRelay from 'relay/Isomorphic';
import QueryAggregator from 'relay/Router/QueryAggregator';
import render from './render';
import getAggregateContainer from './getAggregateContainer';

class IsomorphicQueryAggregator extends QueryAggregator {
  updateQueryConfig(routerProps) {
    super.updateQueryConfig(routerProps);

    this.Container = getAggregateContainer(this.fragmentSpecs);
  }
}

function prepareInitialRender(environment, renderProps) {
  const queryAggregator = new IsomorphicQueryAggregator(renderProps);

  return IsomorphicRelay.prepareInitialRender({
    environment,
    Container: queryAggregator.Container,
    queryConfig: queryAggregator.queryConfig,
  }).then(({ initialReadyState }) => ({
    ...renderProps,
    environment,
    initialReadyState,
    queryAggregator,
    render,
  }));
}

function prepareData(renderProps, networkLayer, preloadedRequests) {
  const queryAggregator = new IsomorphicQueryAggregator(renderProps);

  return IsomorphicRelay.prepareData(
    {
      Container: queryAggregator.Container,
      queryConfig: queryAggregator.queryConfig,
    },
    networkLayer,
    preloadedRequests
  ).then(({ data, props: { environment, initialReadyState } }) => ({
    data,
    props: {
      ...renderProps,
      environment,
      initialReadyState,
      queryAggregator,
    },
  }));
}

export default {
  prepareData,
  prepareInitialRender,
  render,
};
