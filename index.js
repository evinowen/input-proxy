const express = require('express')
const robotjs = require('robotjs')
const fs = require('fs')

const app = express()
const port = 3000

const SECOND = 1000
const HOLD = 0.5 * SECOND
const LIMIT = 5 * SECOND

function wait(duration) {
  if (duration > LIMIT) {
    duration = LIMIT
  }

  return new Promise(resolve => setTimeout(resolve, duration));
}

function load (path) {
  return new Promise((resolve, reject) =>
    fs.readFile(path, 'utf8', (error, data) => error ? reject(error) : resolve(JSON.parse(data)))
  )
}

async function hold (key, duration) {
  if (duration < 0) {
    duration = HOLD
  }

  console.log(key, 'down')
  robotjs.keyToggle(key, 'down')

  await wait(duration)

  console.log(key, 'up')
  robotjs.keyToggle(key, 'up')
}

function make_routes(app, prefix, map) {
  for (route in map) {
    const key = map[route]
    const route_string = `${prefix}/${route}`

    if (typeof key === 'object') {
      console.log(`Creating subroutes for ${route_string} ... `)
      make_routes(app, route_string, key)
    } else {
      console.log(`Mapping route ${route_string} to [${key}]`)
      app.post(`${route_string}`, async (req, res) => {
        let seconds = req.query.s || -1;

        await hold(key, seconds * SECOND)

        res.status(200).send('OK')
      })
    }
  }
}


async function main () {
  make_routes(app, '', await load('map.json'))

  app.listen(port, () => console.log(`http://localhost:${port}`))
}

main()
