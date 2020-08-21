export default {
  state: {
    cacheFlag: {
      search: false,
      playDetail: false
    }
  },
  mutations: {
    enterCache(state, key) {
      state.cacheFlag[key] = true;
      console.log(state.cacheFlag)
    },
    backCache(state, key) {
      state.cacheFlag[key] = false;
      console.log(state.cacheFlag)
    },
    clearCache(state) {
      for(let key in state.cacheFlag){
        if(state.cacheFlag[key]){
          state.cacheFlag[key] = false
        }
      }
    }
  },
  getters: {
    hasCache: state => {
      for(let key in state.cacheFlag){
        if(state.cacheFlag[key]){
          return true;
        }
      }
      return false;
    }
  }
}