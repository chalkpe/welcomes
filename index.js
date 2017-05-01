const command = require('./lib/command')
const powerline = require('./lib/powerline')

module.exports = async results => {
  const [logs, powerlines] = [[], []]

  results.forEach(res => {
    if (res.powerline) powerlines.push(res.powerline)
    if (res.command) logs.push(...command(res.command), '')
  })

  ;[powerline(powerlines), ...logs.slice(0, -1)].forEach(log => console.log(log))
}
