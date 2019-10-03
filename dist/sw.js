
// Importation de workbox depuis un CDN
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

// Ajout de code personnalisé
workbox.routing.registerRoute(
    new RegExp('https://api.meteo-concept.com/api/forecast/daily/1'),
    workbox.strategies.cacheFirst()
);

//Ajout d'un placeholder 
workbox.precaching.precacheAndRoute([
  {
    "url": "assets/images/yes.jpg",
    "revision": "fd57a324bac5aeb0f1255a2f3e21bfc4"
  },
  {
    "url": "index.html",
    "revision": "c200c1ddcd16f42d343f5350d120f24e"
  },
  {
    "url": "main.js",
    "revision": "0fafad94a0bda4150db46d432cdd5bdd"
  },
  {
    "url": "style.css",
    "revision": "309a74b0bf7d90ad3895f3a2714342a2"
  }
]);