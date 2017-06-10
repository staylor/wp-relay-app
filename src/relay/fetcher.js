// import RelayQueryResponseCache from 'relay-runtime/lib/RelayQueryResponseCache';
import md5 from 'md5';
import 'isomorphic-fetch';

// eslint-disable-next-line no-warning-comments
// TODO: Update this when someone releases a real, production-quality solution
// for handling universal rendering with Relay Modern. For now, this is just
// enough to get things working.

class FetcherBase {
  constructor(url) {
    this.url = url;
  }

  async fetch(batch, variables) {
    let query;
    if (batch.query.operation === 'mutation') {
      query = batch.text;
    } else {
      const queryID = md5(batch.text);
      query = `id:${queryID}`;
    }
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });
    return response.json();
  }
}

export class ServerFetcher extends FetcherBase {
  constructor(url) {
    super(url);

    this.payloads = [];
  }

  async fetch(...args) {
    const i = this.payloads.length;
    this.payloads.push(null);
    const payload = await super.fetch(...args);
    this.payloads[i] = payload;
    return payload;
  }

  toJSON() {
    return this.payloads;
  }
}

export class ClientFetcher extends FetcherBase {
  constructor(url, payloads) {
    super(url);

    this.payloads = payloads;
  }

  async fetch(...args) {
    if (this.payloads.length) {
      return this.payloads.shift();
    }

    return super.fetch(...args);
  }
}
