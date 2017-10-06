const Timemitter = require('../dist/timemitter');

jest.useFakeTimers();

test('#reset - call 3sec only 1 time in 6sec', () => {
  const timer = new Timemitter();
  const mockCallback = jest.fn();

  timer
    .at(3, time => mockCallback(time))
    .at(5, () => timer.reset())
    .start();

  jest.runTimersToTime(6000);

  expect(mockCallback.mock.calls.length).toBe(1);
});

test('#reset - call 3sec 2 times in 10sec', () => {
  const timer = new Timemitter();
  const mockCallback = jest.fn();

  timer
    .at(3, time => mockCallback(time))
    .at(5, () => timer.reset())
    .start();

  jest.runTimersToTime(10000);

  expect(mockCallback.mock.calls.length).toBe(2);
});

test('#reset - call 2sec 2 times in 5sec again', () => {
  const timer = new Timemitter();
  const mockCallback = jest.fn();

  timer
    .every(2, time => mockCallback(time))
    .start();

  jest.runTimersToTime(5000);

  timer.reset();

  jest.runTimersToTime(5000);

  expect(mockCallback.mock.calls.length).toBe(4);
});
