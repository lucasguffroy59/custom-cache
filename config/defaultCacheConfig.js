const cacheConfigOptionsTemplate = {
  size: -1, // Max number of elements allowed in cache
  ttl: -1, // Global time to live of elements of the cache
};

Object.freeze(cacheConfigOptionsTemplate);

module.exports = cacheConfigOptionsTemplate;
