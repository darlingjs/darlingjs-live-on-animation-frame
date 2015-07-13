'use strict';

var runner = require('../');
var expect = require('chai').expect;
describe('live on animation frame', function() {
  it('should return function', function() {
    expect(runner()).to.be.a('function');
  });
});
