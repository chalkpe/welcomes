const chalk = require('chalk')
const powerline = require('./powerline')
const options = { timeout: 3000, responseType: 'json' }
const loadPlugin = plugin => require(`./plugins/${plugin}`)(options)

async function print (...plugins) {
  const logs = []
  const powerlines = []

  const results = await Promise.all(plugins.map(loadPlugin))
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

print('time', 'hangang', 'dimibob').catch(err => {
  console.error(err)
  process.exit(1)
})
