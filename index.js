const express = require('express')
const robotjs = require('robotjs')

const app = express()
const port = 3000

const SECOND = 1000

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.post('/left', async (req, res) => {
  for (let i = 3; i > 0; i--) {
    console.log('countdown...', i)
    await wait(SECOND)
  }

  console.log('left down')
  robotjs.keyToggle('left', 'down')

  await wait(0.1 * SECOND)

  console.log('left up')
  robotjs.keyToggle('left', 'up')

  res.status(200).send('OK')
})

app.listen(port, () => console.log(`http://localhost:${port}`))
