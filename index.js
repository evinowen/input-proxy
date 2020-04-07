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

async function main () {
  const buttons = await load('map.json')

  for (route in buttons) {
    const key = buttons[route]
    console.log(`Mapping route /${route} to [${key}]`)

    app.post(`/${route}`, async (req, res) => {
      await hold(key)

      res.status(200).send('OK')
    })
  }

  app.listen(port, () => console.log(`http://localhost:${port}`))
}

main()
