#!/usr/bin/env node

const welcomes = require('..')

const fs = require('mz/fs')
const path = require('path')
const Promise = require('bluebird')
const minimist = require('minimist')

const requirePlugin = name => Promise.any([
  Promise.try(() => require(`welcomes-plugin-${name}`)),
  Promise.try(() => require(path.resolve(__dirname, '..', 'plugins', name)))
])

const loadPlugins = (argv, plugins) => Promise.map(plugins, plugin => {
  const name = plugin.pluginName
  if (!name) return plugin(argv)

  const mine = typeof argv[name] === 'object' ? argv[name]
  : Object.assign({}, ...Object.keys(argv)
    .filter(key => key.startsWith(`${name}:`))
    .map(key => ({ [key.slice(key.indexOf(':') + 1)]: argv[key] })))

  return plugin(Object.assign({}, argv, { my: mine }))
})

const getArgv = async () => {
  const argv = minimist(process.argv.slice(2))
  if (!argv.config) return argv

  const encoding = argv.encoding || 'utf-8'
  const config = JSON.parse(await fs.readFile(argv.config, encoding))

  return Object.assign({}, argv, config)
}

async function main () {
  const argv = await getArgv()
  if (argv.verbose) console.log(argv)

  return Promise.map(argv._, requirePlugin)
    .then(plugins => loadPlugins(argv, plugins))
    .then(results => welcomes(argv, results))
    .catch(err => argv.dev ? console.error(err) : process.exit(1))
}

main()
  .then(() => process.exit(0))
  .catch(err => console.error(err) || process.exit(1))
