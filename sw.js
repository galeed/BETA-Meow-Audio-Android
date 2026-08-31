self.addEventListener('fetch', (event) => {
  // Evitar que el Service Worker interfiera con blobs locales de música o peticiones parciales de audio
  if (event.request.url.startsWith('blob:') || event.request.headers.get('range')) {
    return; // Deja que el navegador maneje el archivo local de forma nativa
  }

  // Tu lógica actual de caché para index.html, estilos y temas va aquí abajo...
});


const CACHE_NAME = 'reproductor-unico-v1';
const ASSETS = [
  './',
  'index.html'
];

// Instalar y guardar el HTML único
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Servir el HTML desde la caché si no hay internet
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});