const command = require('./lib/command')
const powerline = require('./lib/powerline')

module.exports = async plugins => {
  const logs = []
  const powerlines = []

  const results = await Promise.all(plugins)
  results.forEach(result => {
    if (result.powerline) powerlines.push(result.powerline)
    if (result.command) logs.push(...command(result.command))
  })

  console.log(powerline(powerlines))
  logs.forEach(log => console.log(log))
}
