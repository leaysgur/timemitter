const Timemitter = require('../dist/timemitter');

jest.useFakeTimers();

test('#start - default', () => {
  const timer = new Timemitter();
  const mockCallback = jest.fn();

  timer
    .at(4, time => mockCallback(time))
    .start();

  jest.runTimersToTime(5000);

  expect(mockCallback.mock.calls.length).toBe(1);
  expect(mockCallback.mock.calls[0][0]).toBe(4);
});

test('#start - ignore duplicated start', () => {
  const timer = new Timemitter();
  const mockCallback = jest.fn();

  timer
    .at(4, time => mockCallback(time))
    .start()
    .start();

  jest.runTimersToTime(5000);

  expect(mockCallback.mock.calls.length).toBe(1);
  expect(mockCallback.mock.calls[0][0]).toBe(4);
});

test('#start - specify: no time', () => {
  const timer = new Timemitter();
  const mockCallback = jest.fn();

  timer
    .at(4, time => mockCallback(time))
    .start(2000);

  jest.runTimersToTime(3000);

  expect(mockCallback.mock.calls.length).toBe(0);
});

test('#start - specify: just time', () => {
  const timer = new Timemitter();
  const mockCallback = jest.fn();

  timer
    .at(4, time => mockCallback(time))
    .start(250);

  jest.runTimersToTime(1000);

  expect(mockCallback.mock.calls.length).toBe(1);
  expect(mockCallback.mock.calls[0][0]).toBe(4);
});

test('#start - specify: enough time', () => {
  const timer = new Timemitter();
  const mockCallback = jest.fn();

  timer
    .every(4, time => mockCallback(time))
    .start(250);

  jest.runTimersToTime(2000);

  expect(mockCallback.mock.calls.length).toBe(2);
  expect(mockCallback.mock.calls[0][0]).toBe(4);
  expect(mockCallback.mock.calls[1][0]).toBe(8);
});

