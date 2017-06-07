import 'isomorphic-fetch';

export default function createFetch(url) {
  return async function fetchQuery(operation, variables) {
    let response;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: operation.text,
          variables,
        }),
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      throw e;
    }

    return response.json();
  };
}
