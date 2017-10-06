const Timemitter = require('../dist/timemitter');

jest.useFakeTimers();

test('#at - single', () => {
  const timer = new Timemitter();
  const mockCallback = jest.fn();

  timer
    .at(4, time => mockCallback(time))
    .start();

  jest.runTimersToTime(5000);

  expect(mockCallback.mock.calls.length).toBe(1);
  expect(mockCallback.mock.calls[0][0]).toBe(4);
});

test('#at - multi', () => {
  const timer = new Timemitter();
  const mockCallback = jest.fn();

  timer
    .at(0, time => mockCallback(time))
    .at(2, time => mockCallback(time))
    .at(4, time => mockCallback(time))
    .start();

  jest.runTimersToTime(5000);

  expect(mockCallback.mock.calls.length).toBe(3);
  expect(mockCallback.mock.calls[0][0]).toBe(0);
  expect(mockCallback.mock.calls[1][0]).toBe(2);
  expect(mockCallback.mock.calls[2][0]).toBe(4);
});

test('#at - single same time', () => {
  const timer = new Timemitter();
  const mockCallback = jest.fn();

  timer
    .at(1, time => mockCallback(time))
    .at(1, time => mockCallback(time))
    .start();

  jest.runTimersToTime(2000);

  expect(mockCallback.mock.calls.length).toBe(2);
  expect(mockCallback.mock.calls[0][0]).toBe(1);
  expect(mockCallback.mock.calls[1][0]).toBe(1);
});
