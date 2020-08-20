export default class Cache {
  constructor(size = 100, permissive = false) {
    const self = this;
    self.size = size;
    self.permissive = permissive;
    self.cacheStorage = {};
  }

  /**
   * Try to add a key/value pair to cache, override if already exists
   * @param {*} key The key to set to cache
   * @param {*} value The value to set to cache
   * @return {boolean} True if successfuly set to cache, false if cache full
   */
  set(key, value) {
    // If cache is full, interrupt process
    if (Object.keys(this.cacheStorage).length >= this.size) return false;

    // If everything went well, add key/value to cache
    this.cacheStorage[key] = value;
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
    if (Object.keys(this.cacheStorage).length >= this.size) return false;

    // If cache entry already exists, interrupt process
    if (this.cacheStorage[key]) return false;

    // If everything went well, add key/value to cache
    this.cacheStorage[key] = value;
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
    // Return the key from cache
    return this.cacheStorage[key];
  }

  /**
   * Get all cache content
   * @return {*} The cache content, or null if it's empty
   */
  getAll() {
    // If cache is empty, return undefined
    if (!Object.keys(this.cacheStorage).length) return undefined;

    // Return the cache content
    return this.cacheStorage;
  }
}
