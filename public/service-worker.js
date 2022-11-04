const cacheName = "cache-v15";
const staticAssets = [
    './index.html',
    './logo192.png',
    './pokemon-1.png',
    './src/App.css',
    './src/index.css',
    './src/api/pokeman.js',
    './src/App.js'
  
]

self.addEventListener('install', async event => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
});

self.addEventListener('activate', event => {
    self.clients.claim();
});

// self.addEventListener('fetch', async event => {

//     const req = event.request;
    
//     const url = new URL(req.url);

//     if (url.origin === location.origin) {
//         event.respondWith(cacheFirst(req));
//     } else {
//         event.respondWith(networkAndCache(req));
//     }
// });
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((resp) => {
            return resp || fetch(event.request).then((response) => {
                return caches.open(cacheName).then((cache) => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
        );
    });
async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    return cached || fetch(req);
}

async function networkAndCache(req) {
    const cache = await caches.open(cacheName);
    try {
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    } catch (error) {
        const cached = await cache.match(req);
        return cached;
    }
}