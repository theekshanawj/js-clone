const assert = require('assert').strict;
const clone = require('./');

const source = {
  object: { nested: { deepNesting: { key: 1 } }  },
  array: [1 , 2, 4],
  arrayWithObject: [ { object: { nested: { key: 2 } } } ],
  arrayOfArrays: [ [ { object: { nested: { key: 3 }}} ] ],
  nullKey: null,
  nestedNull: { key: undefined },
};

const cloned = clone(source);

// clone function test

assert.deepEqual(cloned, source, 'these object should be equal in value');
assert(cloned !== source, 'cloned and source should not be same');
assert(cloned.object !== source.object, 'cloned and source should not share object property');
assert.deepEqual(cloned.object, source.object, 'cloned.object and source.object should be equal');
assert(cloned.array !== source.array, 'cloned and source should not share array property');
assert.deepEqual(cloned.array, source.array, 'cloned.array and source.array should be equal in value');
assert(cloned.arrayWithObject !== source.arrayWithObject, 'cloned and source should not share arrayWithObject property');
assert.deepEqual(cloned.arrayWithObject, source.arrayWithObject, 'cloned.arrayWithObject and source.arrayWithObject should be equal in value');
assert(cloned.arrayOfArrays !== source.arrayOfArrays, 'cloned and source should not share arrayOfArrays property');
assert.deepEqual(cloned.arrayOfArrays, source.arrayOfArrays, 'cloned.arrayOfArrays and source.arrayOfArrays should be equal in value');
assert(cloned.object.nested !== source.object.nested, 'cloned and source should not share nested properties');
assert(cloned.object.nested.deepNesting !== source.object.nested.deepNesting, 'cloned and source should not share nested properties');


// Object.assign support only shallow copy
const clonedUsingObjectAssign = Object.assign({}, source);
assert.deepEqual(clonedUsingObjectAssign, source, 'these object should be equal');
assert(clonedUsingObjectAssign !== source, 'clonedUsingObjectAssign and source should not be same');
assert(clonedUsingObjectAssign.object === source.object, 'clonedUsingObjectAssign and source should share object property');
assert(clonedUsingObjectAssign.array === source.array, 'clonedUsingObjectAssign and source should share array property');
assert(clonedUsingObjectAssign.arrayWithObject === source.arrayWithObject, 'clonedUsingObjectAssign and source should share arrayWithObject property');
assert(clonedUsingObjectAssign.arrayOfArrays === source.arrayOfArrays, 'clonedUsingObjectAssign and source should share arrayOfArrays property');

assert(clone('asss') === null, 'clone only support objects and arrays');
assert(clone() === null, 'undefined/null should return null');


console.log('All test test have been passed');
