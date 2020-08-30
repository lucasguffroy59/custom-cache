const cacheDefaultOptions = require('../config/defaultCacheConfig');
const { currentTimestamp } = require('../libs/utils');
const {
  cacheIsEmpty,
  cacheExceededSize,
  keyIsCacheable,
  valueIsCacheable,
  formatAddedValue,
  formatReturnedCacheContent,
} = require('../libs/helpers');

class Cache {
  /**
   * Cache class constructor
   * @constructs Cache
   * @param {object=} options Contains every options to customize the cache instance
   */
  constructor(options) {
    const self = this;
    const { size: defaultSize, ttl: defaultTtl } = cacheDefaultOptions;
    const { size = defaultSize, ttl = defaultTtl } = options || {};
    self.size = size;
    self.ttl = ttl;
    self.cacheStorage = {};
  }

  /**
   * Try to add a key/value pair to cache, override if already exists
   * @param {*} key The key to set to cache
   * @param {*} value The value to set to cache
   * @return {boolean} True if successfuly set to cache, false if cache full
   */
  set(key, value) {
    if (cacheExceededSize(this.cacheStorage, this.size)) return false;

    if (!keyIsCacheable(key)) return false;

    if (!valueIsCacheable(value)) return false;

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
    if (cacheExceededSize(this.cacheStorage, this.size)) return false;

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
    if (cacheIsEmpty(this.cacheStorage)) return undefined;
    const exploitableCacheContent = formatReturnedCacheContent(this.cacheStorage);
    return exploitableCacheContent;
  }
}

module.exports = Cache;
