import RelayQueryResponseCache from 'relay-runtime/lib/RelayQueryResponseCache';
import md5 from 'md5';
import 'isomorphic-fetch';

const cache = new RelayQueryResponseCache({ size: 250, ttl: 60 * 5 * 1000 });
const throwError = e => {
  // eslint-disable-next-line no-console
  console.error(e);
  throw e;
};
const getParams = queryParams => ({
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(queryParams),
});

export default function createFetch(url) {
  return async function fetchQuery(batch, variables) {
    if (batch.query.operation === 'mutation') {
      return fetch(
        url,
        getParams({
          query: batch.text,
          variables,
        })
      )
        .catch(throwError)
        .then(res => res.json());
    }

    const queryID = md5(batch.text);
    const data = cache.get(queryID, variables);
    if (data !== null) {
      return Promise.resolve({ data });
    }

    return fetch(
      url,
      getParams({
        query: `id:${queryID}`,
        variables,
      })
    )
      .catch(throwError)
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
