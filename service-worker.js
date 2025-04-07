// service-worker.js
const CACHE_NAME = 'diced-rpg-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/new-styles.css',
  '/manifest.json',
  '/data.js',
  '/main.js',
  // Core services
  '/ConfigService.js',
  '/StateService.js',
  '/QuestService.js',
  '/QuestDataService.js',
  '/NotificationService.js',
  '/TemplateService.js',
  // Views
  '/QuestListView.js',
  '/QuestDetailView.js',
  '/AttributeView.js',
  '/SettingsView.js',
  // Controllers
  '/QuestController.js',
  '/Router.js',
  // Icons from your manifest
  '/assets/icon-72x72.png',
  '/assets/icon-96x96.png',
  '/assets/icon-128x128.png',
  '/assets/icon-144x144.png',
  '/assets/icon-152x152.png',
  '/assets/icon-192x192.png',
  '/assets/icon-384x384.png',
  '/assets/icon-512x512.png'
];

// Install event - cache all static assets
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching static assets');
        return cache.addAll(STATIC_ASSETS);

// Activate event - clean up old caches
const cachePromises = STATIC_ASSETS.map(url => {
          return cache.add(url).catch(error => {
            console.error(`[Service Worker] Failed to cache: ${url}`, error);
            // Continue despite the error
            return Promise.resolve();
          });
        });
        
        return Promise.all(cachePromises);
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Return cached response if found
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Otherwise fetch from network
        return fetch(event.request)
          .then(response => {
            // Don't cache if response is not valid or is a data request
            if (!response || response.status !== 200 || response.type !== 'basic' || 
                event.request.url.includes('data.js')) {
              return response;
            }
            
            // Clone the response as it can only be consumed once
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          })
          .catch(() => {
            // If network fails and it's a document request, serve offline page
            if (event.request.mode === 'navigate') {
              return caches.match('/offline.html');
            }
          });
      })
  );
});
