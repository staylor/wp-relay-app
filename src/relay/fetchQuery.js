import fetch from 'fbjs/lib/fetch';

export default function fetchQuery(
  operation,
  variables
) {
  return fetch('http://localhost:3000/graphql', {
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
