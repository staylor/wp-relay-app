import fetch from 'fbjs/lib/fetch';
import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';
import handlerProvider from './handlerProvider';

function fetchQuery(
  operation,
  variables
) {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => response.json());
}

const network = Network.create(fetchQuery);
const source = new RecordSource();
const store = new Store(source);

const environment = new Environment({
  handlerProvider,
  network,
  store,
});

export default environment;
