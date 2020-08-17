import store from './index'
soundManager.setup({
    onready: function() {
      
    }
  });
function sMset(state, url) {
  soundManager.destroySound('Clors')
  soundManager.createSound({
    id: 'Clors',
    url: url,
    autoLoad: true,
    autoPlay: false,
    onfinish: function(){
      store.commit('finish')
    }
  });
}
export default {
  state: {
    playing: false,
    firstSong: {
      name: '入海',
      singer: '毛不易',
      mid: '00221jjt01LOTE',
    },
    defaultSong: {
      name: '入海',
      singer: '毛不易',
      mid: '00221jjt01LOTE'
    },
    songList: []
  },
  mutations: {
    addSongList(state, song) {
      state.songList.unshift({
        name: song.name,
        singer: song.singer,
        mid: song.mid
      })
    },
    addSongFirst(state, song) {
      state.firstSong.name = song.name
      state.firstSong.singer = song.singer
      state.firstSong.mid = song.mid
    },
    default(state){
      state.firstSong.name = state.defaultSong.name
      state.firstSong.singer = state.defaultSong.singer
      state.firstSong.mid = state.defaultSong.mid
      state.playing = false
    },
    play(state, url) {
      if(url != ''){
        sMset(state, url)
      }
      soundManager.play('Clors');
      state.playing = true
    },
    pause(state) {
      soundManager.pause('Clors');
      state.playing = false
    },
    finish(state){
      if(state.songList.length == 0){
        state.firstSong = state.defaultSong;
      }else{
        state.firstSong = state.songList[0];
        state.songList.shift()
      }
    }
  }
}
