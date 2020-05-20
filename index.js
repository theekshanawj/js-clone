/**
 * Utility methods for cloning JS objects and arrays
 */

/**
 * Clone array
 * @param target array
 * @param source array
 */
const cloneArray = (target, source) => {
    if (!target || target.constructor !== Array || !source || source.constructor !== Array) return [];
    // Iterate over the array
    source.forEach((value, index) => {
        if(value && value.constructor === Object) {
            // If a object is found, clone it
            target[index] = {};
            cloneObject(target[index], value);
        } else if(value && value.constructor === Array) {
            // If another array is found, clone the array
            target[index] = [];
            cloneArray(target[index], value);
        } else {
            target[index] = value;
        }
    });
};

/**
 * Clone objects
 * @param target object
 * @param source object
 */
const  cloneObject = (target, source) => {
    if (!target || target.constructor !== Object || !source || source.constructor !== Object) return {};
    // Iterate through entries
    for(const [key, value] of Object.entries(source)) {
        if (value && value.constructor === Object) {
            // If object is found, clone is recursively
            target[key] = {};
            cloneObject(target[key], value);
        } else if (value && value.constructor === Array) {
            // If array is found, call cloneArray
            target[key] = [];
            cloneArray(target[key], value);
        } else {
            // If not an array or object, assign to target
            target[key] = source[key];
        }
    }
};


/**
 * Returned the cloned object
 * @param source
 * @returns {{}|null|[]}
 */
const clone = (source) => {
    if(!source) return null;
    if(source.constructor === Object) {
        const target = {};
        cloneObject(target, source);
        return  target;
    }
    if (source.constructor === Array) {
        const target = [];
        cloneArray(target, source);
        return  target;
    }
    return null;
};

module.exports = clone;
