const moment = require('moment')

module.exports = () => ({
  powerline: {
    message: moment().format('HH:mm:ss'),
    color: 'white',
    blackText: true
  }
})
