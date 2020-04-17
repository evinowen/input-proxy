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
        await hold(key)

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
