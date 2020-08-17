const files = require.context('./', false, /.api.js$/)
const apiObj = {}

files.keys().map(key => {
  apiObj[key.substring(2, key.length - 7)] = files(key).default
})

export default apiObj
