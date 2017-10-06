# timemitter

Time based event Emitter for casual use.

> Internal clock is a `setInterval()`, so I don't reccomend this for serious use.

## Install

```sh
npm install timemitter
# or
yarn add timemitter
```

## Usage

```js
import Timemitter from 'timemitter';

const timer = new Timemitter();
timer
  .at(0, time => console.log(`${time}: start!`))
  .at(3, time => console.log(`${time}: at 3sec`))
  .at(5, time => console.log(`${time}: at 5sec`))
  .every(2, time => console.log(`${time}: every 2sec`))
  .at(60, time => console.log(`${time}: at 1min`))
  .start();
```

This code logs,

```
0: start!
2: every 2sec
3: at 3sec
4: every 2sec
5: at 5sec
6: every 2sec
8: every 2sec

// ...

60: at 1min
60: every 2sec
```

## API
### at(time, handler)

Fire handler only once at specified `time`.

- `time`: number
- `handler`: (time: number) => {}

```js
new Timemitter()
  .at(3, time => console.log(`Fired after ${time}sec`)) // 3
  .start();
```

If negative value passed to `time`, it is treated as `0`.

### every(time, handler)

Fire handler every `time` in interval.

- `time`: number
- `handler`: (time: number) => {}

```js
new Timemitter()
  .every(3, () => console.log(`Fired after every ${time}sec`)) // 3, 6, 9, 12...
  .start();
```

If zero or negative value passed to `time`, it is treated as `1`.

### start(interval)

Start the timer. Default interval is 1sec = `1000`.

- `interval`: number

```js
new Timemitter()
  .at(2, () => console.log(`Fired after ${time} * 0.5sec`))
  .start(500);
```

In this case, `interval` is `500`. So handler called in 1sec.

### reset()

Reset timer count to 0.

```js
const timer = new Timemitter();
timer
  .at(3, () => console.log('Fired after 3sec'))
  .at(5, () => timer.reset())
  .start();
```

This case,

- called once after 3sec
- and `reset()` at 5sec
- called again at 8sec point from start

### destroy()

Stop interval and remove all handlers.

```js
const timer = new Timemitter();
timer
  .at(3, () => console.log('Fired after 3sec'))
  .start();

timer.destroy();
```

In this case, 3sec handler do not be called.
