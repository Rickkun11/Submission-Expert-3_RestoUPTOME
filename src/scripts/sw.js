/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-extraneous-dependencies */
import 'regenerator-runtime';
import { precacheAndRoute } from 'workbox-precaching';
import { clientsClaim, setCacheNameDetails } from 'workbox-core';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import CONFIG from './globals/config';

const {
  BASE_URL,
  CACHE_NAME,
  CACHE_API_NAME,
  CACHE_IMAGE_NAME,
} = CONFIG;

self.skipWaiting();
clientsClaim();

setCacheNameDetails({
  precache: CACHE_NAME,
});

precacheAndRoute(self.__WB_MANIFEST, { ignoreURLParametersMatching: [/.*/] });

registerRoute(
  ({ url, request }) => url.origin === BASE_URL && request.destination !== 'image',
  new NetworkFirst({ cacheName: CACHE_API_NAME }),
);

registerRoute(
  ({ url, request }) => url.origin === BASE_URL && request.destination === 'image',
  new CacheFirst({
    cacheName: CACHE_IMAGE_NAME,
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 40,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  }),
);
