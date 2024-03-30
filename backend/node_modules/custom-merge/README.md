Custom Merge
============

Create a custom merge function

`npm install custom-merge`

Usage
-----

```javascript

var createMerge = require('custom-merge')
  , extend = createMerge({ inPlace:true, deep:true, array:'concat', priority:'right' })
  , defaults = createMerge({ inPlace:true, deep:false, array:'replace', priority:'left' })
  , defaultOptions = { awesome:true, hidden:false }

extend({ a:1, b:2, c:{ d:[1,2] } }, { a:5, c:{ d:[3,4] } })
// { a:5, b:2, c:{ d:[1,2,3,4] } }

defaults({ hidden:true }, defaultOptions)
// { awesome:true, hidden:true }

```

Options
-------

### `inPlace` *Boolean* 
When `true` (default), merges changes into the first argument.  When `false`, merges changes into a clone of the first argument.

### `deep` *Boolean*
When `true` (default) merges additional levels. When `false`, only merges the top level.

### `array` *String*
- `'replace'` (default): When two arrays are to be merged, replace one with the other
- `'concat'`: When two arrays are to be merged, concatenate the arrays
- `'merge'`: When two arrays are to be merged, merge their corresponding indexes

### `priority` *String*
- `'right'` (default): When replacing values, use the rightmost value
- `'left'`:When replacing values, use the leftmost value