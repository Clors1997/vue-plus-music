const path = require('path')
const resolve = dir => path.resolve(__dirname, '../', dir)

module.exports = config => {
  config.resolve.alias.set('@', resolve('./src'))

  if (process.env.NODE_ENV === 'production') {
    require('./webpack.config.prod.js')(config)
  } else {
    require('./webpack.config.dev.js')(config)
  }
}
