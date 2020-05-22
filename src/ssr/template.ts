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
    ${helmet.link.toString()}
    <link rel="shortcut icon" href="/icons/favicon.ico">
    <link rel="shortcut icon" href="/icons/favicon.png">
    <link rel="shortcut icon" href="/icons/favicon.jpg">
    <link rel="shortcut icon" href="/icons/favicon.gif">
    <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png">
    <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#818890">
    
    
    ${styleTags}
    
   
    <!— Google Tag Manager —>
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.paren..;
        })(window,document,'script','dataLayer','GTM-PVL7KKZ');</script>
    <!— End Google Tag Manager —>
    
    
    <!— Global site tag (gtag.js) - Google Analytics —>
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-162765238-1"></script>
        <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-162765238-1');
      </script>
    <!— /Global site tag (gtag.js) - Google Analytics —>
    
    <!— Yandex.Metrika counter —>
       <script type="text/javascript" >
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(53255053, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
            });
        </script>
        <noscript><div><img src="https://mc.yandex.ru/watch/53255053" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
    <!— /Yandex.Metrika counter —>
    
    
    
    <!-- Facebook Pixel Code -->
     <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '2869422513167285');
        fbq('track', 'PageView');
     </script>
    <noscript> <img height="1" width="1" src="https://www.facebook.com/tr?id=2869422513167285&ev=PageView&noscript=1"/></noscript>
  <!-- End Facebook Pixel Code -->
    
  <!-- VK Pixel -->
    <script type="text/javascript">!function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://vk.com/js/api/openapi.js?167",t.onload=function(){VK.Retargeting.Init("VK-RTRG-470995-4bXWc"),VK.Retargeting.Hit()},document.head.appendChild(t)}();</script><noscript><img src="https://vk.com/rtrg?p=VK-RTRG-470995-4bXWc" style="position:fixed; left:-999px;" alt=""/></noscript>
  <!-- /VK Pixel -->
    
</head>

<body>
    
    <!— Rating Mail.ru counter —>
        <script type="text/javascript">
            var _tmr = window._tmr || (window._tmr = []);
            _tmr.push({id: "3169578", type: "pageView", start: (new Date()).getTime()});
            (function (d, w, id) {
            if (d.getElementById(id)) return;
            var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
            ts.src = "https://top-fwz1.mail.ru/js/code.js";
            var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
            if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
            })(document, window, "topmailru-code");
        </script>
        <noscript><div><img src="https://top-fwz1.mail.ru/counter?id=3169578;js=na" style="border:0;position:absolute;left:-9999px;" alt="Top.Mail.Ru" /></div></noscript>
    <!— //Rating Mail.ru counter —>
    
    
    
    <!— Google Tag Manager (noscript) —>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PVL7KKZ"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!— End Google Tag Manager (noscript) —>
    
    <noscript>Пожалуйста, включите JavaScript в настройках браузера для корректного отображения контента сайта.</noscript>
    <script>window.INITIAL_STATE = ${JSON.stringify(preloadedState)}</script>
    ${scripts}
    <div id="root">${html}</div>
</body>
</html>
`
export default template
