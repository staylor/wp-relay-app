import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import handlerProvider from './handlerProvider';
import fetchQuery from './fetchQuery';

const network = Network.create(fetchQuery);
const source = new RecordSource();
const store = new Store(source);

const environment = new Environment({
  handlerProvider,
  network,
  store,
});

export default environment;
