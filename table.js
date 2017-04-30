// const fs = require('mz/fs')
const { max, ceil, floor } = Math
const multibytes = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g
const maxLength = process.stdout.columns

const space = n => ' '.repeat(n)
const sum = arr => arr.reduce((a, b) => a + b, 0)
const len = str => str ? str.replace(multibytes, '콩콩').length : 0
const pad = (str, n) => space(ceil(n / 2)) + str + space(floor(n / 2))

const table = async (arr, size) => {
  const chunks = [...Array(ceil(arr.length / size))]
    .map((_, i) => arr.slice(i * size, ++i * size))
    .map(c => c.concat(...space(size)).slice(0, size))

  const lengths = [...Array(size)]
    .map((_, i) => 2 + max(...chunks.map(c => len(c[i]))))

  if (size > 1 && size + sum(lengths) >= maxLength) return table(arr, size - 1)

  const border = ([left, filler, centre, right]) =>
    [left, lengths.map(n => filler.repeat(n)).join(centre), right].join('')

  // const coloured = await fs.readFile('./assets/favorites.txt')

  const lines = chunks
    .map(c => c.map((str, i) => pad(str, lengths[i] - len(str))))
    .map(c => [null, ...c, null].join('│'))
    .reduce((res, c, i) => res.concat(border(i ? '├─┼┤' : '┌─┬┐'), c), [])

  return lines.concat(border('└─┴┘'))
}

module.exports = table
