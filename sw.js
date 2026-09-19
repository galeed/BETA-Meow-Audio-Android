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

// Un solo evento fetch unificado y optimizado
self.addEventListener('fetch', (event) => {
  // 1. Proteger la música: Evitar que el Service Worker interfiera con blobs locales o peticiones parciales de audio
  if (event.request.url.startsWith('blob:') || event.request.headers.get('range')) {
    // Retornar vacío deja que el navegador maneje el archivo local de forma nativa sin meterlo a la caché
    return; 
  }

  // 2. Lógica de caché para la interfaz: Servir el HTML desde la caché si no hay internet
  event.respondWith(
    caches.match(event.request).then(response => {
        return response || fetch(event.request);
    })
  );
});
