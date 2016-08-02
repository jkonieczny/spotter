var CURRENT_CACHES = 'v1.0.14';

self.addEventListener('install', function(event) {
  console.log("SW installed", CURRENT_CACHES, self.registration.scope);
  var cachedAssests = [
    'index.html',
    'bundle/css/bundle.css',
    'bundle/js/bundle.js',
    'images/fit-avatar.png',
    'images/icon.png',
    'fonts/AvenirNext-Regular.woff2',
    'fonts/AvenirNext-Bold.woff2'
  ];

  // Node removes trailing slashes, Apache addes them!
  //var spotterDir = (self.registration.scope.search('localhost') > - 1) ? '/spotter' : '/spotter/';
  //cachedAssests.push(spotterDir);

  event.waitUntil(
    caches.open(CURRENT_CACHES).then(function(cache) {
      return cache.addAll(cachedAssests);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('SW activated');
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (CURRENT_CACHES.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        console.log('event.request', event.request.url);
        if (response) {
          console.log('event.request.match', event.request.url);
          return response;
        }

        return fetch(event.request);
      }
    )
  );
});