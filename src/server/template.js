
/* eslint-disable prefer-template, max-len */

export default vo => `

<!DOCTYPE html>
<html lang="en">
<head>
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta charSet='utf-8' />
  <meta httpEquiv="Content-Language" content="en" />
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link id="favicon" rel="shortcut icon" href="/kyt-favicon.png" sizes="16x16 32x32" type="image/png" />
  ${vo.cssBundle ? '<link rel="stylesheet" type="text/css" href="' + vo.cssBundle + '" />' : ''}

  <title>WordPress Relay App</title>
</head>

<body>
  <main id="main">${vo.root}</main>
  <script id="preloadedData" type="application/json">${encodeURIComponent(JSON.stringify(vo.data))}</script>
  <script src="${vo.jsBundle}"></script>
</body>
</html>

`;
