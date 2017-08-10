import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import createFetch from 'relay/fetcher';

function createEnviroment(url) {
  const recordSource = new RecordSource();
  const store = new Store(recordSource);

  const environment = new Environment({
    network: Network.create(createFetch(url)),
    store,
  });

  return environment;
}

export default createEnviroment;
