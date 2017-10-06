/**
 * timemitter v1.0.0 - (c) leader22 2017 - MIT
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Timemitter = factory());
}(this, (function () { 'use strict';

class TimeEmitter {
  constructor () {
    this.time = 0;

    this._atHandlers = new Map();
    this._everyHandlers = new Map();

    this._timer = 0;
  }

  create(interval = 1000) {
    // run only once
    if (this._timer !== 0) {
      return this;
    }

    // for 0
    this._fireByTime(this.time);

    this._timer = setInterval(() => {
      this.time++;

      this._fireByTime(this.time);
    }, interval);

    return this;
  }

  destroy() {
    this._atHandlers.clear();
    this._everyHandlers.clear();

    clearInterval(this._timer);
    this._timer = 0;

    return this;
  }

  at(time, handler) {
    if (typeof time !== 'number') { return; }
    if (typeof handler !== 'function') { return; }

    // accept > 0
    if (time < 0) {
      time = 0;
    }

    if (this._atHandlers.has(time)) {
      this._atHandlers.get(time).push(handler);
    } else {
      this._atHandlers.set(time, [handler]);
    }

    return this;
  }

  every(time, handler) {
    if (typeof time !== 'number') { return; }
    if (typeof handler !== 'function') { return; }

    // accept > 1
    if (time < 1) {
      time = 1;
    }

    if (this._everyHandlers.has(time)) {
      this._everyHandlers.get(time).push(handler);
    } else {
      this._everyHandlers.set(time, [handler]);
    }

    return this;
  }

  reset() {
    this.time = 0;
    this._fireByTime(this.time);

    return this;
  }

  _fireByTime(time) {
    const atHandlers = this._atHandlers.get(time);
    if (atHandlers) {
      for (let handler of atHandlers) {
        handler(time);
      }
    }

    const everyKeys = this._everyHandlers.keys();
    for (let key of everyKeys) {
      if (time > 0 && time % key === 0) {
        const handlers = this._everyHandlers.get(key);
        if (handlers) {
          for (let handler of handlers) {
            handler(time);
          }
        }
      }
    }
  }
}

return TimeEmitter;

})));
