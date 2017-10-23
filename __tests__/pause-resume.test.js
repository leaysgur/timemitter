const Timemitter = require('../dist/timemitter');

jest.useFakeTimers();

test('#pause', () => {
  const timer = new Timemitter();
  const mockCallback = jest.fn();

  timer
    .at(4, time => mockCallback(time))
    .start();

  timer.pause();

  jest.runTimersToTime(5000);

  expect(mockCallback.mock.calls.length).toBe(0);
  expect(timer.isPaused).toEqual(true);
});

test('#resume', () => {
  const timer = new Timemitter();
  const mockCallback = jest.fn();

  timer
    .at(1, () => timer.pause())
    .at(2, time => mockCallback(time))
    .start();

  jest.runTimersToTime(3000);

  timer
    .at(5, time => mockCallback(time));
  timer.resume();

  jest.runTimersToTime(6000);

  expect(mockCallback.mock.calls.length).toBe(2);
  expect(timer.isPaused).toEqual(false);
});

test('#pause - start again', () => {
  const timer = new Timemitter();
  const mockCallback = jest.fn();

  timer
    .at(0, time => mockCallback(time))
    .at(3, time => mockCallback(time))
    .start();
  timer.pause();

  // Ensure this do nothing
  timer.start();

  jest.runTimersToTime(5000);

  expect(mockCallback.mock.calls.length).toBe(1);
  expect(timer.isPaused).toEqual(true);
});
