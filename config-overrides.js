// eslint-disable-next-line @typescript-eslint/no-var-requires
const LoadablePlugin = require('@loadable/webpack-plugin')


const getLoaders = (config) => {
  const { rules } = config.module
  const runtimeLoaders = rules.find(item => 'oneOf' in item) || {}
  return runtimeLoaders.oneOf || []
}

const findBabelPlugin = (config) => {
  const loaders = getLoaders(config)
  return loaders.find(item => item.options && item.options.babelrc !== undefined && item.test.test('a.tsx'))
}

const addBabelPlugin = (config, name, { prepend } = {}) => {
  const babel = findBabelPlugin(config)
  babel.options.plugins = babel.options.plugins || []
  const method = prepend ? 'unshift' : 'push'
  babel.options.plugins[method](require.resolve(name))
}





const enableLoadable = (config) => {
  config.plugins = config.plugins || []
  config.plugins.push(new LoadablePlugin())
  addBabelPlugin(config, '@loadable/babel-plugin')
}

const enabledEffectorReact = (config) => {
  addBabelPlugin(config, 'effector/babel-plugin')
}


const webpack = function override(config) {
  enabledEffectorReact(config)
  enableLoadable(config)
  return config
}

module.exports = webpack
