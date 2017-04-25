import Helmet from 'react-helmet';

export default ({
  root,
  data,
  cssBundle,
  jsBundle,
}) => {
  const head = Helmet.rewind();

  return `<!DOCTYPE html>
<html ${head.htmlAttributes.toString()}>
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<script src="//use.typekit.net/tts4dcv.js"></script>
<script>try{Typekit.load();}catch(e){}</script>
<link id="favicon" rel="shortcut icon" href="/kyt-favicon.png" sizes="16x16 32x32" type="image/png"  />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" />
${head.meta.toString()}
${head.title.toString()}
${head.script.toString()}
${head.link.toString()}
${cssBundle ? `<link rel="stylesheet" type="text/css" href="${cssBundle}" />` : ''}
<link rel="stylesheet" type="text/css" href="/css/gigpress.css" />
</head>
<body>
<main id="main">${root}</main>
<script id="preloadedData" type="application/json">${JSON.stringify(data).replace(/\//g, '\\/')}</script>
<script src="${jsBundle}"></script>
</body>
</html>`;
};
