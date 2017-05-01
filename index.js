const command = require('./lib/command')
const powerline = require('./lib/powerline')

module.exports = async (argv, results) => {
  const [logs, powerlines] = [[], []]

  results.forEach(res => {
    if (res.powerline) powerlines.push(res.powerline)
    if (res.command) logs.push(...command(argv, res.command), '')
  })

  const output = [powerline(argv, powerlines), ...logs.slice(0, -1)]
  return output.forEach(log => console.log(log))
}
