// service-worker.js

const CACHE_NAME = 'invitacion-ruth-v1';

// Lista de todos los archivos necesarios para que la aplicación funcione offline.
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',

    // Fuentes
    './fonts/HARRYP_.TTF',

    // Iconos
    './essets/Imagen2.ico',

    // Imágenes y GIFs
    './Imagenes/Imagen1.jpg',
    './Imagenes/Imagen2.jpg',
    './Imagenes/Imagen3.jpg',
    './Imagenes/Imagen4.jpg',
    './Imagenes/Imagen5.jpg',
    './Imagenes/Imagen6.jpg',
    './Imagenes/Imagen7.jpg',
    './Imagenes/Imagen8.jpg',
    './Imagenes/Imagen9.jpg',
    './Imagenes/Imagen10.jpg',
    './Imagenes/ImagenGif.gif',
    './Imagenes/volando1.png',
    './Imagenes/volando2.png',

    // Sonidos
    './Sonido/vin-harry-potter.mp3',
    './Sonido/the-mischievous-wizard-311524.mp3',
    './Sonido/Juro solemnemente qu.mp3',
    './Sonido/Harry-Potter-4.mp3',
    './Sonido/Nick Cave & The Bad Seeds - O Children.mp3',
    './Sonido/Coro Hogwarts en español - ESCOLANIA DEL RECUERDO.mp3',
    './Sonido/creepy-halloween-bells-loop-408748.mp3'
];

// Evento 'install': se guarda todo en caché.
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caché abierto');
                return cache.addAll(urlsToCache);
            })
    );
});

// Evento 'fetch': responde con los archivos desde el caché si están disponibles.
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});

// Evento 'activate': limpia cachés viejos si actualizamos la versión.
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => Promise.all(
            cacheNames.map(cacheName => {
                if (cacheWhitelist.indexOf(cacheName) === -1) {
                    return caches.delete(cacheName);
                }
            })
        ))
    );
});
