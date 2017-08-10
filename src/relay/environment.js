import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import fetchQuery from 'relay/fetcher';
import { Resolver } from 'found-relay';

export const recordSource = new RecordSource();
export const store = new Store(recordSource);

const environment = new Environment({
  network: Network.create(fetchQuery),
  store,
});

export const resolver = new Resolver(environment);

export default environment;
