const oxr = require('open-exchange-rates')
const latestRates = id => new Promise(resolve => {
  oxr.set({ app_id: id })
  oxr.latest(() => resolve(oxr.rates))
})

module.exports = async argv => {
  const rates = await latestRates(argv.my.appId)

  const powerline = {
    style: argv.my.style,
    color: 'yellow',
    fgColor: 'black',
    message: `${argv.my.icon || '₩'} ${rates[argv.my.currency || 'KRW']}`
  }

  return { powerline }
}

module.exports.pluginName = 'exchange-rate'
