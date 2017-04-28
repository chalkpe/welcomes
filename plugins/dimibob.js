const axios = require('axios')
const chalk = require('chalk')
const moment = require('moment')
const URL = 'http://dimigo.in/pages/dimibob_getdata.php'

function getMeal (date) {
  const time = date.hours() * 100 + date.minutes()

  if (time <= 815) return 'breakfast'
  if (time <= 1350) return 'lunch'
  if (time <= 1950) return 'dinner'
  if (time <= 2140) return 'snack'
  return 'tomorrow'
}

function concat (array, maxWidth, delimiter = ' · ') {
  return array.reduce((list, item) => {
    const lastItem = list.pop()
    const newItem = lastItem + delimiter + item

    if (newItem.length <= maxWidth) list.push(newItem)
    else list.push(lastItem, item)

    return list
  }, [array.shift()])
}

module.exports = async options => {
  let now = moment()
  let meal = getMeal(now)
  options = Object.assign(options, { d: now.format('YYYYMMDD') })

  let isTomorrow = meal === 'tomorrow'
  if (isTomorrow) {
    meal = 'breakfast'
    now.add(1, 'day')
  }

  let { data } = await axios.get(URL, options)
  if (typeof data !== 'object' || !data[meal]) throw new Error()

  const meals = data[meal].split('/')
  const input = `dimibob --${meal} ${isTomorrow ? '--tomorrow' : ''}`
  const output = concat(meals, 25).map(m => chalk.italic(m))

  return { command: { input, output } }
}
