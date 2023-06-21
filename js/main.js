// Check if service worker is supported
if(navigator.serviceWorker) {
    navigator.serviceWorker
    .register('../sw_cached_site.js')
    .then(reg => console.log('Service worker: Registered'))
    .catch(err => console.log(`Service worker: Error: ${err}`));
}