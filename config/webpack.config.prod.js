const cdn = require('./cdn')
module.exports = config => {
  if (cdn.enable) {
    config.plugin('html').tap(args => {
      args.forEach(arg => {
        arg.cdns = {
          JS: Object.values(cdn.JS).map(item => {
            return typeof item === 'string' ? item : item.url
          }),
          CSS: Object.values(cdn.CSS)
        }
      })
      return args
    })
    config.externals(
      Object.entries(cdn.JS).reduce((result, [key, value]) => {
        result[key] = typeof value === 'string' ? key : value.exportName
        return result
      }, {})
    )
  }
}
