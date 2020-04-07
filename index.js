const express = require('express')
const robotjs = require('robotjs')
const fs = require('fs')

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

function load (path) {
  return new Promise((resolve, reject) =>
    fs.readFile(path, 'utf8', (error, data) => error ? reject(error) : resolve(JSON.parse(data)))
  )
}

async function hold (key) {
  console.log(key, 'down')
  robotjs.keyToggle(key, 'down')

  await wait(HOLD)

  console.log(key, 'up')
  robotjs.keyToggle(key, 'up')
}

const buttons = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right',
  a: 'a',
  b: 'b',
  select: 'enter',
  start: 'escape'
}

for (route in buttons) {
  const key = buttons[route]
  console.log(`Mapping route ${route} to [${key}]`)

  app.post(`/${route}`, async (req, res) => {
    await hold(key)

    res.status(200).send('OK')
  })
}


app.listen(port, () => console.log(`http://localhost:${port}`))
