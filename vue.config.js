const webpackConfig = require('./config/webpack.config.js')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

const DEV_URL = 'http://127.0.0.1'

module.exports = {
  lintOnSave: false,
  configureWebpack: config => {
    if (isProd) {
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: /\.js$|\.html$|\.css$/,
          threshold: 4096
        })
      )
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '加载中'
      return args
    })

    config.module
      .rule('vue')
      .use('js-nesting-conditional-compile-loader')
        .loader('js-nesting-conditional-compile-loader')
        .tap(() => {
          let options = {
            isDebug: true,
            MY: false,
            DESKTOP: false,
            APP: true
          }
          return options
        })
    config.module
      .rule('js')
      .use('js-nesting-conditional-compile-loader')
        .loader('js-nesting-conditional-compile-loader')
        .tap(() => {
          let options = {
            isDebug: true,
            MY: false,
            DESKTOP: false,
            APP: true
          }
          return options
        })

    webpackConfig(config)
  },
  productionSourceMap: false,
  publicPath: !isProd ? '/' : '',
  css: {
    extract: !!isProd,
    sourceMap: !isProd,
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            hack: 'true;@import "~@/style/_variables.less"'
          }
        }
      }
    }
  },
  devServer: {
    port: 12315,
    proxy: {
      '^/api': {
        target: DEV_URL,
        changeOrigin: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
