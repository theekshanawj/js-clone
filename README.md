# js-clone-deep
JavaScript utility method for deep cloning Object and Array.

## How to use

Get the npm module from [here](https://www.npmjs.com/package/js-clone-deep) 

```javascript
const clone = require('js-clone-deep');

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

## Developer warning

This method currently supports deep cloning of `Object ({})` and `Array ([])` only. Data structures such as `Set, WeakSets, Maps, WeakMaps, Streams, etc ` will not be cloned. 

Use this module considering the above limitation. 

## Perf comparison

Following simple perf test was executed to compare the `js-clone-deep` with `lodash.cloneDeep` clone time.

```javascript
const clone = require('js-clone-deep');
const lodash = require('lodash');
const assert = require('assert').strict;


// Random object key generator
// Add given number of keys to an object
const generateRandomObject = (object, keyCount) => {
	for(let count = 1; count <= keyCount; count += 1) {
		object[`key${Math.random()}`] = Math.random();
	} 
};

let nestingLevel = 1;
while (nestingLevel <= 2014) {
    
       const source = {};
       let pointer = source;

       // generate a nested symmetric object where keys in a level and nested levels are equal 
	for (let i = 1; i <= nestingLevel ; i += 1) {
	   generateRandomObject(pointer, nestingLevel);
	   if ( nestingLevel - i > 0) {
		   	pointer.nesting = {};
		   	pointer = pointer.nesting;
	   }
	  
	}

	console.log("nestingLevel:", nestingLevel);

	console.time("clone");
	let copy = clone(source);
	console.timeEnd("clone");
	assert.deepEqual(copy, source, 'source and copy should be equal in value');


	console.time("cloneDeep");
	copy = lodash.cloneDeep(source);
	console.timeEnd("cloneDeep");
	assert.deepEqual(copy, source, 'source and copy should be equal in value');

	nestingLevel *= 2;

}
```

### Results

|Nested level| Time taken by Clone `Tclone` (ms) | Time taken by Lodash.cloneDeep `Tlodash` (ms) | `(1- Tclone/Tlodash)*100` |
| :---: | :---: | :---: | :---: |
|1| 0.155 |0.419 | 62.8% |
|2| 0.0203 |0.0576 | 64.7% |
|4| 0.0513 |0.063 | 18.5% |
|8| 0.071 |0.139 | 49.2% |
|16| 0.155 |0.419 | 62.8% |
|32| 0.953 |2.075 | 54.1% |
|64| 5.434|6.370 | 14.7% |
|128| 12.277 | 7.599 | - 61.6% |
|256| 39.713 |28.687 | - 38.4% |
|512| 171.322 | 90.187 | - 90.0% |
|1024| 599.723 |393.691 | - 52.3% |

It is seen when nested levels go beyond 64, `lodash.cloneDeep` performing better than `clone` (which is expected with the complex implementation)

But for simple use cases `clone` module can be light and useful.
