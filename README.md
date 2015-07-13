# darlingjs-live-on-animation-frame
update pipeline on animation frame

[Change Log](https://github.com/darlingjs/darlingjs-live-on-animation-frame/blob/master/CHANGELOG.md)

## Installation

```
npm i --save darlingjs-live-on-animation-frame
```

## Usage

```javascript
var darling = require('darlingjs');
var box2d = require('darlingjs-box2d');
var pixijs = require('darlingjs-pixijs');
var onAnimationFrame = require('darlingjs-live-on-animation-frame');

/**
 * Create world with pipeline:
 * - pysics: box2d
 * - and visualization: pixijs
 *
 * and make it lives on per frame of animation
 *
 */

darling
  .world('brand new world')
  .pipe(box2d())
  .pipe(pixijs())
  .live(onAnimationFrame({
    autostart: true
  }));
  
```
