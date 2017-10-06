const Timemitter = require('../dist/timemitter');

jest.useFakeTimers();

test('#destroy - stop immediately', () => {
  const timer = new Timemitter();
  const mockCallback = jest.fn();

  timer
    .at(1, time => mockCallback(time))
    .at(3, time => mockCallback(time))
    .at(5, () => timer.destroy())
    .at(7, time => mockCallback(time))
    .start();

  jest.runTimersToTime(8000);

  expect(mockCallback.mock.calls.length).toBe(2);
});

test('#destroy - remove all handlers', () => {
  const timer = new Timemitter();
  const mockCallback = jest.fn();

  timer
    .at(1, time => mockCallback(time))
    .at(3, time => mockCallback(time))
    .at(5, time => mockCallback(time))
    .start();

  timer.destroy();

  jest.runTimersToTime(8000);

  expect(mockCallback.mock.calls.length).toBe(0);
});
