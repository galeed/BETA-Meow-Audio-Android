const CACHE_NAME = 'reproductor-unico-v2';
const ASSETS = [
  './',
  'index.html',
  'https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.min.js'
];

// Instalar y guardar assets y recursos externos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Evento activate: Limpieza dinámica de versiones de caché antiguas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Evento fetch unificado
self.addEventListener('fetch', (event) => {
  // Proteger la música: Evitar interferir con blobs locales o peticiones parciales de audio (range)
  if (event.request.url.startsWith('blob:') || event.request.headers.get('range')) {
    return;
  }

  // Lógica de caché Cache-First para la interfaz y recursos estáticos
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Manejo de eventos de reproducción y notificaciones del sistema en segundo plano
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
