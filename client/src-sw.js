const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

//PRECACHEANDROUT() METHOD TAKES AN ARRAY OF URLS TO PRECAHCE. THE SELF WB_MANEFEST IS AN ARRAY THAT CONTAINS THE LIST OF URLS TO PRECACHE
precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

//IMPLEMENT ASSET CACHING
registerRoute(
  //DEFINE CALLBACK FUNCTION THAT WILL FILTER THE REQUESTS TO CACHE (JS AND CSS FILES)
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  new StaleWhileRevalidate({
    //NAME OF THE CACHE STORAGE.
    cacheName: "asset-cache",
    plugins: [
      //PLUGIN WITH CACHE RESPONSES WITH HEADER TO MAX AGE OF 30 DAYS
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
