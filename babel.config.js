const prodPlugin = []

if (process.env.NODE_ENV === 'production') {
  prodPlugin.push([
    'transform-remove-console',
    {
      exclude: ['error', 'warn']
    }
  ])
}

module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
      },
      'vant'
    ],
    ...prodPlugin
  ]
};
