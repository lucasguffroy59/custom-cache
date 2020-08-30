/* Utils are functions non-specific to cache module */

/**
 * Know if a data is an object or not
 * @param {*} data The data you want to test
 * @return {boolean} True if it's an object, false if it's not
 */
const dataIsObject = (data) => typeof data === 'object' && data !== null;

/**
 * Know if a data is a string or not
 * @param {*} data The data you want to test
 * @return {boolean} True if it's a string, false if it's not
 */
const dataIsString = (data) => typeof data === 'string' || data instanceof String;

/**
 * Know if a data is defined or not
 * @param {*} data The data you want to test
 * @return {boolean} True if it's defined, false if it's not
 */
const dataIsDefined = (data) => typeof data !== 'undefined';

/**
 * Know if a string strictly exceeds a set length
 * @param {string} string A string
 * @param {number} length The length
 * @return {boolean} True if it strictly exceeds length, or false
 */
const stringExceededLength = (string, length) => {
  return string.length > length;
};

/**
 * Deep clone an object or array even if nested.
 * @param {object} object An object or array
 * @return {object} A deep-clone of the object or array
 */
const deepCloneObject = (object) => {
  const objectKeys = Object.keys(object);
  const newObject = {};
  for (let i = 0; i < objectKeys.length; i++) {
    const aKey = objectKeys[i];
    newObject[aKey] = dataIsObject(object[aKey]) ? deepCloneObject(object[aKey]) : object[aKey];
  }
  return newObject;
};

/**
 * Cleans an object by sorting it's keys alphabeticaly.
 * If a key contains an object, will call this function recursively.
 * @param {object} object The object to clean
 * @return {object} The cleaned object
 */
const cleanObject = (object) => {
  const objectKeys = Object.keys(object);
  objectKeys.sort();
  const newObject = {};
  for (let i = 0; i < objectKeys.length; i++) {
    const aKey = objectKeys[i];
    newObject[aKey] = dataIsObject(object[aKey]) ? cleanObject(object[aKey]) : object[aKey];
  }
  return newObject;
};

/**
 * Know if an object (or array) exceeds a certain size (number of keys)
 * @param {object} object An object (or array)
 * @param {number} size The size
 * @return {boolean} True if it exceeded set size, or false
 */
const objectExceededSize = (object, size) => {
  return Object.keys(object).length >= size;
};

/**
 * Know if an object (or array) is empty (number of keys)
 * @param {object} object An object (or array)
 * @return {boolean} True if it is empty, or false
 */
const objectIsEmpty = (object) => {
  return Object.keys(object).length === 0;
};

/**
 * Get the current date timestamp\
 * Format : Number of milliseconds elapsed since January 1, 1970 00:00:00 UTC
 * @return {number} The current timestamp
 */
const currentTimestamp = () => {
  return Date.now();
};

module.exports = {
  dataIsObject,
  dataIsString,
  dataIsDefined,
  stringExceededLength,
  deepCloneObject,
  cleanObject,
  objectExceededSize,
  objectIsEmpty,
  currentTimestamp,
};
