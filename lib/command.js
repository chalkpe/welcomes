const chalk = require('../chalk')
const table = require('./table')

module.exports = (argv, { input, output, params, flags }) => {
  let inputs = [
    chalk[argv.promptColor || 'bold_green'](argv.prompt || '$'),
    chalk[argv.commandColor || 'green'](input)
  ]

  if (params) inputs.push(...params)
  if (flags) inputs.push(...flags.map(x => `--${x}`))

  return [inputs.join(' '), ...(output.table ? table(...output.table) : output)]
}
