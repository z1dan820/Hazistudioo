self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  // Langsung ambil dari internet, jangan simpan cache
  // Biar jadwal booking selalu update real-time
  e.respondWith(fetch(e.request));
});

