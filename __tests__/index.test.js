const Timemitter = require('../dist/timemitter');

test('create another instance', () => {
  const timer1 = new Timemitter();
  const timer2 = new Timemitter();

  expect(timer1).not.toBe(timer2);
});
