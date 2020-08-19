import Vue from 'vue'
import API from '../api/qq-music.api'

function apiFactoryBuild(api_key, data) {
  console.log(API[api_key])
  return Vue.http.jsonp(API[api_key].url, {
    params: API[api_key].params(data),
    jsonp: API[api_key].jsonp
  })
}

export default {
  actions: {
    apiFactory(store, { api_key, data }) {
      console.log(api_key, data)
      return apiFactoryBuild(api_key, data)
    },
    getLyric({},id){
          return Vue.http.jsonp('https://api.darlin.me/music/lyric/'+id+'/',{
            jsonp:'callback'
          })
    }
  }
}
