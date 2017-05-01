const chalk = require('chalk')
const bg = color => `bg${color[0].toUpperCase()}${color.slice(1)}`

function * pair (array) {
  for (var i = 0; i < array.length;) {
    yield { current: array[i], next: array[++i] }
  }
}

function build ({ current: { message, color, fgColor, style }, next }) {
  let textChalk = chalk[bg(color)]

  if (style) textChalk = textChalk[style]
  if (fgColor) textChalk = textChalk[fgColor]

  let arrow = chalk[color]
  if (next) arrow = arrow[bg(next.color)] // -> next.color

  return textChalk(` ${message} `) + arrow('')
}

module.exports = list => [...pair(list)].map(build).join('')
