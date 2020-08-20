/**
 * Know if something is an object or not
 * @param {*} data The data you want to test
 * @return {boolean} True if it's an object, false if it's not
 */
const isObject = (data) => typeof data === 'object' && data !== null;

const deepCloneObject = (object) => {
  const objectKeys = Object.keys(object);
  const newObject = {};
  for (let i = 0; i < objectKeys.length; i++) {
    const aKey = objectKeys[i];
    newObject[aKey] = isObject(object[aKey]) ? deepCloneObject(object[aKey]) : object[aKey];
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
    newObject[aKey] = isObject(object[aKey]) ? cleanObject(object[aKey]) : object[aKey];
  }
  return newObject;
};

export default { cleanObject, deepCloneObject, isObject };
