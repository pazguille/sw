'use strict';

importScripts('serviceworker-cache-polyfill.js');

var CACHE_NAME = 'v1';
var urlsToCache = [
  'https://code.jquery.com/jquery-2.1.4.min.js'
];

this.addEventListener('install', function(eve) {
  eve.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// Remove all caches
// this.addEventListener('activate', function(event) {
//   event.waitUntil(
//     caches.keys().then(function(keys) {
//       // caches.delete('v1');
//       keys.forEach(function(key) {
//         caches.delete(key);
//       })
//     })
//   );
// });

this.addEventListener('fetch', function(eve) {
  eve.respondWith(
    caches.match(eve.request).then(function(response) {
      return response || fetch(eve.request);
    })
  );
});
