/**
 * live runner for darlingjs (http://darlingjs.github.io)
 *
 * it updates world of darlingjs on each animation frame
 *
 * @type {exports}
 */

'use strict';

var raf = require('raf');

module.exports = function(ops) {
  ops = ops || {};
  return function(step){
    var api = {
      /**
       * start runner
       *
       * @returns {api}
       */
      start: function() {
        if (this.playing) {
          return this;
        }

        this.playing = true;
        raf(function tick() {
          step();
          raf(tick);
        });

        return this;
      },
      /**
       * stop runner
       *
       * @returns {api}
       */
      stop: function() {
        if (!this.playing) {
          return this;
        }
        this.playing = false;

        raf.cancel();
        return this;
      }
    };

    if (ops.autostart) {
      api.start();
    }

    return api;
  };
};
