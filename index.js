const express = require('express')
const robotjs = require('robotjs')

const app = express()
const port = 3000

const SECOND = 1000
const HOLD = 0.1 * SECOND

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function countdown (seconds) {
  for (let i = seconds; i > 0; i--) {
    console.log('countdown >>', i)
    await wait(SECOND)
  }
}

async function hold (key) {
  console.log(key, 'down')
  robotjs.keyToggle(key, 'down')

  await wait(HOLD)

  console.log(key, 'up')
  robotjs.keyToggle(key, 'up')
}

app.post('/left', async (req, res) => {
  await countdown(4)
  await hold('left')

  res.status(200).send('OK')
})

app.listen(port, () => console.log(`http://localhost:${port}`))
