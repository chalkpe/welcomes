#!/usr/bin/env node

const welcomes = require('..')

const path = require('path')
const Promise = require('bluebird')
const minimist = require('minimist')

const argv = minimist(process.argv.slice(2))

const requirePlugin = name => Promise.any([
  Promise.try(() => require(`welcomes-plugin-${name}`)),
  Promise.try(() => require(path.resolve(__dirname, '..', 'plugins', name)))
])

const loadPlugin = plugin => {
  const mine = plugin.pluginName && Object.assign({}, ...Object.keys(argv)
    .filter(key => key.startsWith(`${plugin.pluginName}:`))
    .map(key => ({ [key.slice(key.indexOf(':') + 1)]: argv[key] })))

  return plugin(Object.assign({}, argv, { my: mine || {} }))
}

Promise.map(argv._, requirePlugin)
  .then(plugins => Promise.map(plugins, loadPlugin))
  .then(results => welcomes(argv, results))
  .catch(err => argv.dev ? console.error(err) : process.exit(1))
