const CACHE_NAME = "ama-podcast-v1";

const ASSETS_ESTATICOS = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./icono-192.png",
  "./icono-512.png"
];

// 1. Instalación: guarda en caché la interfaz y los iconos
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_ESTATICOS);
    })
  );
});

// 2. Activación: limpia cachés antiguas si actualizas la versión (v1 -> v2)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Peticiones: nunca cachea audios de GitHub Releases ni tráfico de Firebase
self.addEventListener("fetch", (event) => {
  const url = event.request.url;

  if (
    event.request.method !== "GET" ||
    url.includes("github.com") ||
    url.includes("githubusercontent.com") ||
    url.includes("firebase") ||
    url.includes("googleapis.com")
  ) {
    return;
  }

  // Estrategia Network-First con respaldo en caché para ver cambios rápido al desarrollar
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const resClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});