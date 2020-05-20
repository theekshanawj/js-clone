# js-clone
JavaScript utility method for deep cloning of Object and Arrays

## How to use

```javascript
const clone = require('js-clone');

// Source object
const source = { id: 346313, items: [...],  meta: {...}  };

// Cloned object
const copy = clone(source);

```

### API Specification

This method currently supports deep cloning of `Objects` and `Arrays` only. Data structures such `Set, WeakSetsm Maps, WeakMaps, Streams, etc ` will not be cloned.


