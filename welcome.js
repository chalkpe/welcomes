const chalk = require('chalk')
const powerline = require('./powerline')

module.exports = async plugins => {
  const logs = []
  const powerlines = []

  const results = await Promise.all(plugins)
  results.forEach(result => {
    if (result.powerline) powerlines.push(result.powerline)
    if (result.command) {
      let { input, output } = result.command
      if (!Array.isArray(output)) output = [output]
      logs.push(`${chalk.bold.green('$')} ${chalk.green(input)}`, ...output)
    }
  })

  console.log(powerline(powerlines))
  logs.forEach(log => console.log(log))
}
