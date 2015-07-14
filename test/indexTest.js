'use strict';

var rewire = require('rewire');
var runner = rewire('../');

var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('live on animation frame', function() {
  var clock;
  var requestAnimationFrame;
  var nextFrame = function() {
    requestAnimationFrame.getCall(0).args[0]();
  };
  var step;

  beforeEach(function() {
    requestAnimationFrame = sinon.spy();
    requestAnimationFrame.cancel = sinon.spy();
    runner.__set__('raf', requestAnimationFrame);

    step = sinon.spy();
    clock = sinon.useFakeTimers();
  });

  it('should return function', function() {
    expect(runner()).to.be.a('function');
  });

  it('should do not call step function until start is happened', function() {
    runner(step);
    expect(step).to.not.have.been.called;
    expect(requestAnimationFrame).to.not.have.been.called;
  });

  it('should call step function on each animation frame', function() {
    runner()(step)
      .start();

    expect(step).to.not.have.been.called;
    expect(requestAnimationFrame).to.have.been.calledOnce;

    nextFrame();
    expect(step).to.have.been.calledOnce;
    expect(requestAnimationFrame).to.have.been.calledTwice;
  });

  it('should cancel update on stop', function() {
    runner()(step)
      .start()
      .stop();

    expect(requestAnimationFrame.cancel).to.have.been.calledOnce;
  });

  it('should auto start runner on option autostart = true', function() {
    runner({
      autostart: true
    })(step);

    expect(requestAnimationFrame).to.have.been.calledOnce;
  });

  it('should pass delay interval to step function', function() {
    runner({
      autostart: true
    })(step);

    clock.tick(100);

    nextFrame();
    expect(step).to.have.been.calledWith(100);
  });

  afterEach(function() {
    clock.restore();
  });
});
