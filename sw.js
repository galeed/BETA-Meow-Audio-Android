/* =========================================================
   MEOW AUDIO APP — Service Worker v2.5
   Estrategia:
   - App shell (HTML/CSS/JS/iconos): cache-first
   - Recursos externos (CDN): stale-while-revalidate
   - Audios locales: nunca se cachean (van por IndexedDB)
   ========================================================= */

const CACHE_NAME = 'meow-audio-v2.5';
const RUNTIME_CACHE = 'meow-runtime-v2.5';

// Archivos del app shell que SIEMPRE deben estar disponibles offline
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './favicon-16x16.png',
  './favicon-32x32.png',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.min.js'
];

// Instalación: precachear el app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // addAll falla si UNO falla, así que los añadimos uno por uno
        return Promise.all(
          APP_SHELL.map((url) =>
            cache.add(url).catch((err) => {
              console.warn('[SW] No se pudo cachear:', url, err);
            })
          )
        );
      })
      .then(() => self.skipWaiting())
  );
});

// Activación: limpiar cachés antiguas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME && key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: estrategia según tipo de recurso
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Solo manejamos GET
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // 1) Ignorar blob:, data:, chrome-extension: y esquemas raros
  if (!url.protocol.startsWith('http')) return;

  // 2) Nunca interceptar audios locales servidos por blob (IndexedDB)
  //    Ya se filtran por protocolo, pero por si acaso:
  if (req.destination === 'audio') return;

  // 3) Peticiones de navegación (HTML) → network-first con fallback a cache
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // 4) Recursos del mismo origen → cache-first
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req)
          .then((res) => {
            if (!res || res.status !== 200) return res;
            const copy = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, copy));
            return res;
          })
          .catch(() => cached);
      })
    );
    return;
  }

  // 5) Recursos externos (CDN jsmediatags) → stale-while-revalidate
  event.respondWith(
    caches.open(RUNTIME_CACHE).then((cache) =>
      cache.match(req).then((cached) => {
        const fetchPromise = fetch(req)
          .then((res) => {
            if (res && res.status === 200) {
              cache.put(req, res.clone());
            }
            return res;
          })
          .catch(() => cached);

        return cached || fetchPromise;
      })
    )
  );
});

// Mensajes desde el cliente (por si quieres forzar update)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
