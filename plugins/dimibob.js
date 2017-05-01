const os = require('os')
const fs = require('mz/fs')
const path = require('path')
const axios = require('axios')
const moment = require('moment')

const url = 'http://dimigo.in/pages/dimibob_getdata.php'
const file = path.resolve(__dirname, '..', 'assets', 'favorites.txt')

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

  const { data } = await axios.get(url, myOptions)
  if (typeof data !== 'object' || !data[meal]) throw new Error('not found')

  const list = data[meal].split(/[ */]/).filter(x => x)
  const favorites = (await fs.readFile(file, 'utf-8'))
    .split(os.EOL).map(item => item.trim()).filter(x => x)

  const command = {
    input: 'dimibob',
    output: { table: [list, Math.ceil(list.length / 2)] },

    params: [params.d],
    flags: flags.filter(x => x),
    options: { highlight: favorites }
  }

  return { command }
}
