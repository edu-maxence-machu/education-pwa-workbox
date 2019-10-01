
// Importation de workbox depuis un CDN
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

// Ajout de code personnalisé
workbox.routing.registerRoute(
    new RegExp('https://api.meteo-concept.com/api/forecast/daily/1'),
    workbox.strategies.cacheFirst()
);

//Ajout d'un placeholder 
workbox.precaching.precacheAndRoute([]);