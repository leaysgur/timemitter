const Timemitter = require('../dist/timemitter');

jest.useFakeTimers();

test('#every - single', () => {
  const timer = new Timemitter();
  const mockCallback = jest.fn();

  timer
    .every(3, time => mockCallback(time))
    .start();

  jest.runTimersToTime(10000);

  expect(mockCallback.mock.calls.length).toBe(3);
  expect(mockCallback.mock.calls[0][0]).toBe(3);
  expect(mockCallback.mock.calls[1][0]).toBe(6);
  expect(mockCallback.mock.calls[2][0]).toBe(9);
});

test('#every - multi', () => {
  const timer = new Timemitter();
  const mockCallback1 = jest.fn();
  const mockCallback2 = jest.fn();

  timer
    .every(3, time => mockCallback1(time))
    .every(3, time => mockCallback2(time))
    .start();

  jest.runTimersToTime(10000);

  expect(mockCallback1.mock.calls.length).toBe(3);
  expect(mockCallback1.mock.calls[0][0]).toBe(3);
  expect(mockCallback1.mock.calls[1][0]).toBe(6);
  expect(mockCallback1.mock.calls[2][0]).toBe(9);
  expect(mockCallback2.mock.calls.length).toBe(3);
  expect(mockCallback2.mock.calls[0][0]).toBe(3);
  expect(mockCallback2.mock.calls[1][0]).toBe(6);
  expect(mockCallback2.mock.calls[2][0]).toBe(9);
});

test('#every - fix negative value to one', () => {
  const timer = new Timemitter();
  const mockCallback = jest.fn();

  timer
    .every(-3, time => mockCallback(time))
    .start();

  jest.runTimersToTime(10000);

  expect(mockCallback.mock.calls.length).toBe(10);
  expect(mockCallback.mock.calls[0][0]).toBe(1);
  expect(mockCallback.mock.calls[1][0]).toBe(2);
  expect(mockCallback.mock.calls[2][0]).toBe(3);
});
