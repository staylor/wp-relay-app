import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';

export default ({ root, data, mainCSSBundle, manifestJSBundle, vendorJSBundle, mainJSBundle }) => {
  const helmet = Helmet.rewind();

  return `<!DOCTYPE html>
<html ${helmet.htmlAttributes.toString()}>
<head>
<meta charSet="utf-8" />
${helmet.title.toString()}
<script src="//use.typekit.net/tts4dcv.js"></script>
<script>try{Typekit.load();}catch(e){}</script>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
<link id="favicon" rel="shortcut icon" href="/kyt-favicon.png" sizes="16x16 32x32" type="image/png" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" />
${mainCSSBundle ? `<link rel="stylesheet" type="text/css" href="${mainCSSBundle}" />` : ''}
<link rel="stylesheet" type="text/css" href="/css/gigpress.css" />
${helmet.meta.toString()}${helmet.link.toString()}${helmet.script.toString()}
</head>
<body>
<script>window.__RELAY_STORE__ = ${serialize(data, { isJSON: true })};</script>
<main id="main">${root}</main>
${manifestJSBundle ? `<script defer src="${manifestJSBundle}"></script>` : ''}
${vendorJSBundle ? `<script defer src="${vendorJSBundle}"></script>` : ''}
${mainJSBundle ? `<script defer src="${mainJSBundle}"></script>` : ''}
</body>
</html>`;
};
