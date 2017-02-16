/* eslint-disable import/imports-first */
import router from './router';
import express from 'express';
import proxy from 'http-proxy-middleware';
import compression from 'compression';
import path from 'path';

const clientAssets = require(KYT.ASSETS_MANIFEST); // eslint-disable-line import/no-dynamic-require
const app = express();

// Remove annoying Express header addition.
app.disable('x-powered-by');

// Compress (gzip) assets in production.
app.use(compression());

// Setup the public directory so that we can server static assets.
app.use(express.static(path.join(process.cwd(), KYT.PUBLIC_DIR)));

// use a local GQL server by default
const gqlHost = process.env.GQL_HOST || 'http://localhost:8080';

// the pathname is dervied from samizdat
const gqlPath = process.env.GQL_PATH || '/graphql';

// proxy to the graphql server
app.use(gqlPath, proxy({
  target: gqlHost,
  changeOrigin: true,
}));

app.get('*', router({
  gqlUrl: gqlHost + gqlPath,
  jsBundle: clientAssets.main.js,
  cssBundle: clientAssets.main.css,
}));

app.listen(parseInt(KYT.SERVER_PORT, 10));
