const { defineCliConfig } = require('sanity/cli')
const path = require('path')

module.exports = defineCliConfig({
  api: {
    projectId: 'w16kaeyg',
    dataset: 'production'
  },
  studioHost: 'dchall',
  vite: (config) => {
    return {
      ...config,
      resolve: {
        ...(config.resolve || {}),
        alias: {
          ...((config.resolve && config.resolve.alias) || {}),
          'focus-lock/constants': path.resolve(__dirname, 'node_modules/focus-lock/dist/es2015/constants.js'),
        }
      }
    }
  }
})

