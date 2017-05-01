const chalk = require('chalk')

module.exports = new Proxy(chalk, {
  get (target, name) {
    name.split('_').forEach(key => (target = target[key]))
    return target
  }
})
