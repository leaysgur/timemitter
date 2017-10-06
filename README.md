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
  .start()
```

This code logs,

```js
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

### every(time, handler)

Fire handler every `time` in interval.

- `time`: number
- `handler`: (time: number) => {}

### start(interval)

Start the timer. Default interval is 1sec = `1000`.

- `interval`: number

### reset()

Reset timer count to 0.

### destroy()

Stop interval and remove all handlers.
