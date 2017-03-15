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
