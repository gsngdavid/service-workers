let cacheName = 'v1';
let cacheAssets = [
    'index.html',
    'story.html',
    'css/style.css',
    'js/main.js'
];


// Call install event
self.addEventListener('install', e => {
    console.log('Service worker: Installed');

    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            // Caching Files
            cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
        .catch(err => console.log(`Service worker: Error: ${err}`))
    );
});


// Call activate event
self.addEventListener('activate', e => {
    console.log('Service worker: Activated');

    e.waitUntil(
        caches.keys()
        .then(cacheKeys => {
            return Promise.all(
                cacheKeys
                .map(cache => {
                    console.log("Cleaning Old cache");
                    if(cache !== cacheName) {
                        return caches.delete(cache);
                    }
                })
                );
        })
        .then(() => self.skipWaiting())
        .catch(err => console.log(`Service Worker: Error: ${err}`))
    );
});


// Call Fetch event
self.addEventListener('fetch', e => {
    e.respondWith(
        fetch(e.request)
        .catch(() => caches.match(e.request)
        .then(cachedResponse => {
            if(cachedResponse) {
                return cachedResponse;
            }
            return new Response('Offline page');
        })
        )
    );
});
