const chalk = require('chalk')
const table = require('./table')

module.exports = ({ input, params, flags, output, options }) => {
  let inputs = [chalk.bold.green('$'), chalk.green(input)]
  if (output.table) output = table(...output.table, options)

  if (params) inputs.push(...params)
  if (flags) inputs.push(...flags.map(x => `--${x}`))

  return [inputs.join(' '), ...output]
}
