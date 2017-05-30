import Helmet from 'react-helmet';

export default ({ root, cssBundle, jsBundle }) => {
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
${cssBundle ? `<link rel="stylesheet" type="text/css" href="${cssBundle}" />` : ''}
<link rel="stylesheet" type="text/css" href="/css/gigpress.css" />
${helmet.meta.toString()}${helmet.link.toString()}${helmet.script.toString()}
</head>
<body>
<main id="main">${root}</main>
<script src="${jsBundle}"></script>
</body>
</html>`;
};
