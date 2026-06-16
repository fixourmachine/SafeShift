const CACHE_NAME = 'safeshift-v3';
const ASSETS = [
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// On install, pre-cache all assets directly from the network (bypass browser HTTP cache)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      console.log('[Service Worker] Pre-caching assets...');
      const requests = ASSETS.map(url => new Request(url, { cache: 'reload' }));
      try {
        await cache.addAll(requests);
        console.log('[Service Worker] All assets pre-cached successfully.');
      } catch (err) {
        console.warn('[Service Worker] Failed to pre-cache with cache:reload, falling back to standard cache.addAll', err);
        try {
          await cache.addAll(ASSETS);
        } catch (fallbackErr) {
          console.error('[Service Worker] Pre-caching completely failed:', fallbackErr);
        }
      }
    })
  );
  self.skipWaiting();
});

// On activation, clean up any old caches and claim clients immediately
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Network-First with Cache Fallback fetch handler
self.addEventListener('fetch', event => {
  // Only handle GET requests and same-origin requests
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Identify core application assets to bypass browser HTTP cache when online
  const urlObj = new URL(event.request.url);
  const pathname = urlObj.pathname;
  const isCoreAsset = event.request.mode === 'navigate' ||
                      pathname.endsWith('.js') || 
                      pathname.endsWith('.css') || 
                      pathname.endsWith('manifest.json');

  event.respondWith(
    (async () => {
      try {
        let requestToFetch = event.request;
        if (isCoreAsset) {
          try {
            // Bypass browser HTTP cache to get the absolute latest from GitHub Pages
            requestToFetch = new Request(event.request, { cache: 'no-cache' });
          } catch (e) {
            // Fallback if Request reconstruction is not supported
          }
        }
        
        const response = await fetch(requestToFetch);
        
        // If the response is valid, update our cache with the latest version
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      } catch (err) {
        // Fallback to cache if network fails (offline)
        console.log('[Service Worker] Fetch failed, falling back to cache for:', event.request.url);
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }

        // Special fallback for navigation requests when offline
        if (event.request.mode === 'navigate') {
          const mainFallback = await caches.match('./index.html');
          if (mainFallback) return mainFallback;
        }
        
        throw err;
      }
    })()
  );
});
