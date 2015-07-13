var raf = require('raf')

module.exports = function(ops) {
  return function(step){
    return {
      start: function() {
        this.playing = true;
        //TODO: implement
      },
      stop: function() {
        this.playing = false;
        //TODO: implement
      }
    };
  };
};
