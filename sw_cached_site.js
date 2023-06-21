let cacheName = 'v2';

// Call Install Event
self.addEventListener('install', () => {
    console.log("Service Worker: Installed");
})


// Call Activate Event
self.addEventListener('activate', e => {
    console.log("Service Worker: Activated")
    e.waitUntil(
        caches.keys().then(cacheKeys => {
            return Promise.all(
                cacheKeys.map(key => {
                    if(key !== cacheName) {
                        console.log('Cleaning old cache');
                        return caches.delete(key);
                    }
                })
            );
        })
        .then(() => self.skipWaiting())
    );
});


// Call Fetch Event
self.addEventListener('fetch', e => {
    console.log("Service Worker: Fetching");

    e.respondWith(
        fetch(e.request)
        .then(res => {
            let resClone = res.clone();
            caches
            .open(cacheName)
            .then(cache => {
                cache.put(e.request, resClone);
            })
            return res;
        })
        .catch(() =>  caches.match(e.request)
            .then(cachedResponse => {
                if(cachedResponse) {
                    return cachedResponse;
                }
                return new Response('Offline page');
            })
        )
    )
});