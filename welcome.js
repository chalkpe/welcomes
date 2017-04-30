const chalk = require('chalk')
const powerline = require('./powerline')

module.exports = async plugins => {
  const logs = []
  const powerlines = []

  const results = await Promise.all(plugins)
  results.forEach(result => {
    if (result.powerline) powerlines.push(result.powerline)
    if (result.command) {
      let { input, params, flags, output } = result.command
      if (!Array.isArray(output)) output = [output]

      let inputs = [chalk.bold.green('$'), chalk.green(input)]

      if (params) inputs.push(...params)
      if (flags) inputs.push(...flags.map(x => `--${x}`))

      logs.push(inputs.join(' '), ...output)
    }
  })

  console.log(powerline(powerlines))
  logs.forEach(log => console.log(log))
}
