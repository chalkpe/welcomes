const chalk = require('../chalk')
const bg = color => `bg${color[0].toUpperCase()}${color.slice(1)}`

function * pair (array) {
  for (var i = 0; i < array.length;) {
    yield { current: array[i], next: array[++i] }
  }
}

function build ({ current: { message, color, fgColor, style }, next }) {
  const text = [bg(color), style, fgColor].filter(x => x).join('_')
  const arrow = [color, next && bg(next.color)].filter(x => x).join('_')

  return chalk[text](` ${message} `) + chalk[arrow]('')
}

module.exports = (argv, list) => [...pair(list)].map(build).join('')
