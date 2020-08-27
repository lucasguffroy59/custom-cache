const utils = require('./utils');

/* Helpers are functions specific to cache module */

const isCacheEmpty = (cache) => {
  return Object.keys(cache).length === 0;
};

const isCacheableKey = (key) => {
  return typeof key === 'string' || key instanceof String;
};

const isCacheableValue = (value) => {
  return value !== undefined;
};

const formatAddedValue = (value) => {
  return { value, dateAdded: utils.currentTimestamp(), dateModified: utils.currentTimestamp() };
};

module.exports = {
  isCacheEmpty,
  isCacheableKey,
  isCacheableValue,
  formatAddedValue,
};
