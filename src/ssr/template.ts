type Args = {
  html?: string,
  preloadedState?: any,
  styleTags?: string,
  scripts?: string,
  helmet?: any,
}

export const template = (
  { html = '', styleTags = '', preloadedState, scripts = '', helmet }: Args) => `
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    <link rel="shortcut icon" href="/icons/favicon.ico">
    <link rel="shortcut icon" href="/icons/favicon.png">
    <link rel="shortcut icon" href="/icons/favicon.jpg">
    <link rel="shortcut icon" href="/icons/favicon.gif">
    <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png">
    <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#818890">
    ${styleTags}
</head>

<body>
    <noscript>Пожалуйста, включите JavaScript в настройках браузера для корректного отображения контента сайта.</noscript>
    <script>window.INITIAL_STATE = ${JSON.stringify(preloadedState)}</script>
    ${scripts}
    <div id="root">${html}</div>
</body>
</html>
`
export default template
