const cacheDefaultOptions = require('../config/defaultCacheConfig');
const { objectExceededSize, currentTimestamp } = require('../libs/utils');
const {
  isCacheEmpty,
  isCacheableKey,
  isCacheableValue,
  formatAddedValue,
} = require('../libs/helpers');

/**
   * Cache class constructor
   * @param {object} options Contains every options to customize the cache instance
   * @return {*} A cache constructed object
   */
class Cache {
  constructor(options) {
    const self = this;
    const { size: defaultSize, ttl: defaultTtl } = cacheDefaultOptions;
    const { size = defaultSize, ttl = defaultTtl } = options || {};
    self.size = size;
    self.ttl = ttl;
    self.cacheStorage = {};
    self.cacheExceededSize = objectExceededSize(self.size);
  }

  /**
   * Try to add a key/value pair to cache, override if already exists
   * @param {*} key The key to set to cache
   * @param {*} value The value to set to cache
   * @return {boolean} True if successfuly set to cache, false if cache full
   */
  set(key, value) {
    // If cache is full, interrupt process
    if (this.cacheExceededSize(this.cacheStorage)) return false;

    if (!isCacheableKey(key)) return false;

    if (!isCacheableValue(value)) return false;

    const cacheEntry = this.cacheStorage[key];

    if (cacheEntry) {
      cacheEntry.dateModified = currentTimestamp();
      cacheEntry.value = value;
      return true;
    }

    this.cacheStorage[key] = formatAddedValue(value);
    return true;
  }

  /**
   * Try to add a key/value pair to cache, interrupts process if already exists
   * @param {*} key The key to add to cache
   * @param {*} value The value to add to cache
   * @return {boolean} True if successfuly added to cache,
   * false if cache full or if key already exists in cache
   */
  add(key, value) {
    // If cache is full, interrupt process
    if (this.cacheExceededSize(this.cacheStorage)) return false;

    // If cache entry already exists, interrupt process
    if (this.cacheStorage[key]) return false;

    // If everything went well, add key/value to cache
    this.cacheStorage[key] = formatAddedValue(value);
    return true;
  }

  /**
   * Remove a key from cache
   * @param {*} key The key to remove from cache
   * @return {boolean} True if successfuly removed from cache, false if key doesn't exist in cache
   */
  remove(key) {
    // If cache entry doesn't exist, interrupt process
    if (!this.cacheStorage[key]) return false;

    // If everything went well, delete key from cache
    delete this.cacheStorage[key];
    return true;
  }

  /**
   * Remove all keys from cache
   * @return {boolean} True if cache successfuly flush
   */
  flush() {
    this.cacheStorage = {};
    return true;
  }

  /**
   * Get a value from cache
   * @param {*} key The key to get from cache
   * @return {*} The retrieved value from cache, or undefined
   */
  get(key) {
    const cacheEntry = this.cacheStorage[key];
    let element;
    if (cacheEntry) element = cacheEntry.value;
    return element;
  }

  /**
   * Get all cache content
   * @return {*} The cache content, or undefined if it's empty
   */
  getAll() {
    if (isCacheEmpty(this.cacheStorage)) return undefined;

    // Return the cache content
    return this.cacheStorage.map((aCacheEntry) => aCacheEntry.value);
  }
}

module.exports = Cache;
