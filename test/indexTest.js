'use strict';

var rewire = require('rewire');
var runner = rewire('../');

var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('live on animation frame', function() {
  var requestAnimationFrame;
  beforeEach(function() {
    requestAnimationFrame = sinon.spy();
    requestAnimationFrame.cancel = sinon.spy();
    runner.__set__('raf', requestAnimationFrame);
  });

  it('should return function', function() {
    expect(runner()).to.be.a('function');
  });

  it('should do not call step function until start is happened', function() {
    var step = sinon.spy();
    runner(step);
    expect(step).to.not.have.been.called;
    expect(requestAnimationFrame).to.not.have.been.called;
  });

  it('should call step function on each animation frame', function() {
    var step = sinon.spy();

    runner()(step)
      .start();

    expect(step).to.not.have.been.called;
    expect(requestAnimationFrame).to.have.been.calledOnce;
    requestAnimationFrame.getCall(0).args[0]();
    expect(step).to.have.been.calledOnce;
    expect(requestAnimationFrame).to.have.been.calledTwice;
  });

  it('should cancel update on stop', function() {
    runner()()
      .start()
      .stop();

    expect(requestAnimationFrame.cancel).to.have.been.calledOnce;
  });

  it('should auto start runner on option autostart = true', function() {
    runner({
      autostart: true
    })();

    expect(requestAnimationFrame).to.have.been.calledOnce;
  });
});
