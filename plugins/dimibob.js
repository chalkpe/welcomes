const axios = require('axios')
const moment = require('moment')
const table = require('../table')
const URL = 'http://dimigo.in/pages/dimibob_getdata.php'

const fields = 'breakfast lunch dinner snack'.split(' ')
const mealTypes = Object.assign({}, ...fields.map(meal => ({ [meal]: meal })))

const getMeal = time =>
  time < 840 + 5 ? mealTypes.breakfast
  : time <= 1350 ? mealTypes.lunch
  : time <= 1950 ? mealTypes.dinner
  : time <= 2140 ? mealTypes.snack : null

module.exports = async options => {
  let [now, meal] = [moment()]
  const flags = [meal = getMeal(now.hours() * 100 + now.minutes())]

  if (!meal) {
    now.add(1, 'day')
    flags.push('tomorrow', meal = mealTypes.breakfast)
  }

  const params = { d: now.format('YYYYMMDD') }
  const myOptions = Object.assign(options, { params })

  const { data } = await axios.get(URL, myOptions)
  if (typeof data !== 'object' || !data[meal]) throw new Error('not found')

  const meals = data[meal].split('/')

  return { command: {
    input: 'dimibob',
    params: [params.d],
    flags: flags.filter(x => x),
    output: table(meals, Math.ceil(meals.length / 2))
  } }
}
