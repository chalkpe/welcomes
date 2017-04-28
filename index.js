const axiosOptions = { timeout: 3000 }
const welcome = require('./welcome.js')

const plugin = name => require(`./plugins/${name}`)
const load = (...list) => list.map(name => plugin(name)(axiosOptions))

// const handler = () => process.exit(1)
const handler = err => console.error(err)
welcome(load('time', 'hangang', 'dimibob')).catch(handler)
