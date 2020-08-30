const utils = require('./utils');

/* Helpers are functions specific to cache module */

/**
 * @typedef {object} formattedCacheValue
 * @property {*} value The cache value
 * @property {number} dateAdded The date the key was added to cache
 * @property {number} dateModified The date the key was updated in cache, or the dateAdded
 */

/**
 * Know if a cache object is empty
 * @param {object} cache A cache object
 * @return {boolean} True if it is empty, or false
 */
const cacheIsEmpty = (cache) => {
  const isEmpty = utils.objectIsEmpty(cache);
  return isEmpty;
};

/**
 * Know if a cache object exceeds a certain size
 * @param {object} cache A cache object
 * @param {number} size The size
 * @return {boolean} True if it exceeded set size, or false
 */
const cacheExceededSize = (cache, size) => {
  const exceededSize = utils.objectExceededSize(cache, size);
  return exceededSize;
};

/**
 * Know if a key can be cached or not
 * @param {string} key A cache key
 * @return {boolean} True if it can be cached, or false
 */
const keyIsCacheable = (key) => {
  const isString = utils.dataIsString(key);
  const isLengthValid = utils.stringExceededLength(key, 255);
  return isString && isLengthValid;
};

/**
 * Know if a value can be cached or not
 * @param {*} value A cache value
 * @return {boolean} True if it can be cached, or false
 */
const valueIsCacheable = (value) => {
  const isDefined = utils.dataIsDefined(value);
  return isDefined;
};

/**
 * Format a value to add to cache by appending dateAdded and dateModified to it
 * @param {*} value The cache value
 * @return {formattedCacheValue} A formatted object to add to cache
 */
const formatAddedValue = (value) => {
  const dateAdded = utils.currentTimestamp();
  const dateModified = utils.currentTimestamp();
  return { value, dateAdded, dateModified };
};

const formatReturnedCacheContent = (cache) => {
  const exploitableCacheContent = cache.map((aCacheEntry) => aCacheEntry.value);
  return exploitableCacheContent;
};

module.exports = {
  cacheIsEmpty,
  cacheExceededSize,
  keyIsCacheable,
  valueIsCacheable,
  formatAddedValue,
  formatReturnedCacheContent,
};
