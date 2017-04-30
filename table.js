function table (arr, size, filler = ' ') {
  const chunkCount = Math.ceil(arr.length / size)
  const getLength = str => str.replace(/[가-힣ㄱ-ㅎㅏ-ㅣ]/g, '22').length

  const chunks = [...Array(chunkCount)]
    .map((_, i) => arr.slice(i * size, ++i * size))
    .map(c => c.concat(...filler.repeat(size)).slice(0, size))

  const lengths = [...Array(size)].map((_, i) =>
    Math.max(...chunks.map(c => c[i] ? getLength(c[i]) : 0)) + 2)

  const max = lengths.reduce((a, b) => a + b) + size >= process.stdout.columns
  if (max && size > 1) return table(arr, size - 1, filler)

  const padded = chunks.map(c => c.map((str, i) => {
    const n = (lengths[i] - getLength(str)) / 2
    const [a, b] = [Math.ceil, Math.floor].map(f => filler.repeat(f(n)))

    return a + str + b
  }))

  const border = ([left, filler, centre, right]) =>
    [left, lengths.map(n => filler.repeat(n)).join(centre), right].join('')

  const lines = padded.reduce((res, c, i) =>
    [...res, border(i ? '├─┼┤' : '┌─┬┐'), [null, ...c, null].join('│')], [])

  return lines.concat(border('└─┴┘'))
}

module.exports = table
