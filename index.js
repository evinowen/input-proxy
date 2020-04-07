const robotjs = require('robotjs')

const SECOND = 1000

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main () {
  for (let i = 8; i > 0; i--) {
    console.log('countdown...', i)
    await wait(SECOND)
  }

  console.log('left down')
  robotjs.keyToggle('left', 'down')

  await wait(4 * SECOND)

  console.log('left up')
  robotjs.keyToggle('left', 'up')

}

main()
