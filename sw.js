const CACHE_NAME = "hazi-offline-v1";
const OFFLINE_URL = "offline.html";

// File yang WAJIB disimpan agar halaman offline bisa tampil
const ASSETS_TO_CACHE = [
    OFFLINE_URL,
    "icon-192.png", // Icon logo biar gak broken image
    "foto.png"      // Foto profil biar tetap tampil
];

// 1. SAAT INSTALL: Simpan file offline ke dalam HP User
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// 2. SAAT USER BUKA APLIKASI
self.addEventListener("fetch", (event) => {
    // Hanya peduli request navigasi (pindah halaman HTML)
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .catch(() => {
                    // JIKA INTERNET MATI -> Ambil offline.html dari Cache
                    return caches.match(OFFLINE_URL);
                })
        );
    } 
    // Untuk gambar/css/js lainnya, coba network dulu, kalau gagal abaikan
    else {
        event.respondWith(
            fetch(event.request).catch(() => null)
        );
    }
});

// 3. BERSIH-BERSIH CACHE LAMA (Saat update versi)
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});
