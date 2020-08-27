const cacheConfigOptionsTemplate = {
  size: 100, // Max number of elements allowed in cache
  ttl: 3600, // Global time to live of elements of the cache
};

Object.freeze(cacheConfigOptionsTemplate);

module.exports = cacheConfigOptionsTemplate;
