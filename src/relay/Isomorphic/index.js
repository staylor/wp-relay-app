import Relay from 'react-relay';
import fromGraphQL from 'react-relay/lib/fromGraphQL';
import IsomorphicRenderer from './IsomorphicRenderer';
import prepareData from './prepareData';

function injectPreparedData(environment, data) {
  const storeData = environment.getStoreData();

  for (const { query: concreteQuery, response } of data) {
    const query = fromGraphQL.Query(concreteQuery);
    storeData.handleQueryPayload(query, response);
  }
}

function prepareInitialRender(props) {
  return new Promise((resolve) => {
    const querySet = Relay.getQueries(props.Container, props.queryConfig);
    const fetchMethod = props.forceFetch ? 'forceFetch' : 'primeCache';

    let request;

    function onReadyStateChange(readyState) {
      if (readyState.aborted || readyState.error || readyState.ready) {
        request.abort();
        resolve({
          ...props,
          initialReadyState: readyState,
        });
      }
    }

    request = props.environment[fetchMethod](querySet, onReadyStateChange);
  });
}

export default {
  injectPreparedData,
  prepareData,
  prepareInitialRender,
  Renderer: IsomorphicRenderer,
};
