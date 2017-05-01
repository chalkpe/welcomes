const axios = require('axios')
const defaultServer = 'http://hangang.dkserver.wo.tc'

// 섭씨 20도 이상이면 초록, 10도 이상이면 청록, 그 아래는 파랑
const waterColour = t => t >= 20 ? 'green' : t >= 10 ? 'cyan' : 'blue'

module.exports = async argv => {
  const options = {
    method: 'get',
    timeout: argv.timeout || 0,
    url: argv.my.server || defaultServer
  }

  let { data } = await axios(options)
  if (typeof data !== 'object') throw new Error()

  const temp = parseFloat(data.temp)
  const powerline = {
    style: argv.my.style,
    color: waterColour(temp),
    fgColor: argv.my.fgColor || 'black',
    message: `${argv.my.icon || '🌡'} ${temp}°C`
  }

  return { powerline }
}

module.exports.pluginName = 'hangang'
