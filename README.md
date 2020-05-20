# js-clone
JavaScript utility method for deep cloning Object and Array.

## How to use

Get the npm module from [here](https://www.npmjs.com/package/js-clone) 

```javascript
const clone = require('js-clone');

// Source object
const source = {
  object: { nested: { deepNesting: { key: 1 } }  },
  array: [1 , 2, 4],
};

// Clone the object
const copy = clone(source);

console.log(source.object === copy.object);
// false

console.log(source.array === copy.array);
// false

```

### Developer warning

This method currently supports deep cloning of `Object ({})` and `Array ([])` only. Data structures such `Set, WeakSets, Maps, WeakMaps, Streams, etc ` will not be cloned. 

Use this module considering the above limitation. 

