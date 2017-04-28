const axios = require('axios')

const URL = 'http://hangang.dkserver.wo.tc'

function waterColour (temp) {
  if (temp >= 20) return 'green'
  if (temp >= 10) return 'cyan'
  return 'blue'
}

module.exports = async options => {
  let { data } = await axios.get(URL, options)
  if (typeof data !== 'object') throw new Error()

  const temp = parseFloat(data.temp)
  return {
    powerline: {
      message: `🌡 ${temp}°C`,
      color: waterColour(temp),
      blackText: false
    }
  }
}
