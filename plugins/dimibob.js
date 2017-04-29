const axios = require('axios')
const moment = require('moment')
const URL = 'http://dimigo.in/pages/dimibob_getdata.php'

const mealTypes = {
  breakfast: 'breakfast',
  lunch: 'lunch',
  dinner: 'dinner',
  snack: 'snack'
}

const getMeal = time =>
  time < 840 + 5 ? mealTypes.breakfast
  : time <= 1350 ? mealTypes.lunch
  : time <= 1950 ? mealTypes.dinner
  : time <= 2140 ? mealTypes.snack : null

function concat (array, size, filler = ' ') {
  const separator = '♪'

  const chunkCount = Math.ceil(array.length / size)
  const length = str => str.replace(/[가-힣ㄱ-ㅎㅏ-ㅣ]/g, '22').length

  const chunks = [...Array(chunkCount)]
    .map((_, i) => array.slice(i * size, ++i * size))
    .map(c => c.concat(...filler.repeat(size)).slice(0, size))

  const maxLengths = [...Array(size)].map((_, i) =>
    Math.max(...chunks.map(c => c[i] ? length(c[i]) : 0)) + 2)

  if (maxLengths.reduce((a, b) => a + b, 0) + size >= process.stdout.columns) {
    if (size > 1) return concat(array, Math.min(1, size - 1), filler)
    else throw new Error('strimg is too long to print in one line!')
  }

  const padded = chunks.map(c => c.map((str, i) => {
    const n = maxLengths[i] - length(str)
    const [l, r] = ['ceil', 'floor'].map(f => filler.repeat(Math[f](n / 2)))

    return [l, str, r].join('')
  }))

  const border = (left, filler, centre, right) =>
    [left, maxLengths.map(n => filler.repeat(n)).join(centre), right].join('')

  const lines = padded.map(c => ['', ...c, ''].join('│'))
    .join([separator, border(...'├─┼┤'), separator].join(''))

  return [border(...'┌─┬┐'), ...lines.split(separator), border(...'└─┴┘')]
}

module.exports = async options => {
  let now = moment()
  let meal = getMeal(now.hours() * 100 + now.minutes())
  let flags = [meal]

  if (!meal) {
    now.add(1, 'day')
    flags.push(meal = mealTypes.breakfast, 'tomorrow')
  }

  let params = { d: now.format('YYYYMMDD') }
  let { data } = await axios.get(URL, Object.assign(options, { params }))
  if (typeof data !== 'object' || !data[meal]) throw new Error('not found')

  const meals = data[meal].split('/')
  const doubles = flags.filter(x => x).map(x => `--${x}`)

  const input = ['dimibob', params.d, ...doubles].join(' ')
  const output = concat(meals, Math.max(3, Math.ceil(meals.length / 2)))

  return { command: { input, output } }
}
