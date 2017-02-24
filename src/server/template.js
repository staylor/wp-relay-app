/* eslint-disable prefer-template, max-len */

export default ({
  head,
  root,
  data,
  cssBundle,
  jsBundle,
}) => `<!DOCTYPE html>
<html ${head.htmlAttributes.toString()}>
<head>
${head.meta.toString()}
${head.title.toString()}
${head.script.toString()}
${head.link.toString()}
${cssBundle ? `<link rel="stylesheet" type="text/css" href="${cssBundle}" />` : ''}
</head>
<body>
<main id="main">${root}</main>
<script id="preloadedData" type="application/json">${JSON.stringify(data).replace(/\//g, '\\/')}</script>
<script src="${jsBundle}"></script>
</body>
</html>`;
