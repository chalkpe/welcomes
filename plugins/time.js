const moment = require('moment')

module.exports = argv => {
  if (argv.my.locale) moment.locale(argv.my.locale)

  const powerline = {
    style: argv.my.style || null,
    color: argv.my.color || 'white',
    fgColor: argv.my.fgColor || 'black',
    message: moment(argv.my.moment).format(argv.my.format || 'HH:mm:ss')
  }

  return { powerline }
}

module.exports.pluginName = 'time'
