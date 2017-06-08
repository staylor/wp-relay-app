import RelayQueryResponseCache from 'relay-runtime/lib/RelayQueryResponseCache';
import md5 from 'md5';
import 'isomorphic-fetch';

const cache = new RelayQueryResponseCache({ size: 250, ttl: 60 * 5 * 1000 });

export default function createFetch(url) {
  return async function fetchQuery(operation, variables) {
    const queryID = md5(operation.text);
    const data = cache.get(queryID, variables);
    if (data !== null) {
      return Promise.resolve({ data });
    }

    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.error(e);
        throw e;
      })
      .then(res => res.json())
      .then(payload => {
        // eslint-disable-next-line no-console
        if (payload.data) {
          cache.set(queryID, variables, payload.data);
        }
        return payload;
      });
  };
}
