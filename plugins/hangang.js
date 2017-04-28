const axios = require('axios')
const URL = 'http://hangang.dkserver.wo.tc'

// 섭씨 20도 이상이면 초록, 10도 이상이면 청록, 그 아래는 파랑
const waterColour = t => t >= 20 ? 'green' : t >= 10 ? 'cyan' : 'blue'

module.exports = async options => {
  let { data } = await axios.get(URL, options)
  if (typeof data !== 'object') throw new Error()

  const temp = parseFloat(data.temp)
  return { powerline: {
    message: `🌡 ${temp}°C`,
    color: waterColour(temp),
    blackText: false
  } }
}
