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
    whileplaying:function(){
      store.commit(
        "updateCurrentTime",
        parseInt(this.position)
      );
      store.commit(
        "updateDuration",
        parseInt(this.duration)
      );
    },
    onfinish: function(){
      store.commit('finish')
    }
  });
}
export default {
  state: {
    playing: false,
    currentTime: 0,
    duration: 0,
    firstSong: {
      id: 0,
      name: '暫無',
      singer: '暫無',
      mid: '',
    },
    defaultSong: {
      id: 265408076,
      name: '入海',
      singer: '毛不易',
      mid: '00221jjt01LOTE'
    },
    songList: []
  },
  mutations: {
    updateCurrentTime (state, time) {
      state.currentTime = time
    },
    updateDuration (state, time) {
      state.duration = time
    },
    addSongList(state, song) {
      state.songList.unshift({
        id: song.id,
        name: song.name,
        singer: song.singer,
        mid: song.mid
      })
      console.log(state.songList)
    },
    addSongFirst(state, song) {
      state.firstSong.id = song.id
      state.firstSong.name = song.name
      state.firstSong.singer = song.singer
      state.firstSong.mid = song.mid
    },
    default(state){
      state.firstSong.id = state.defaultSong.id
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
      console.log(soundManager)
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
  },
  getters: {
    currentTime: state =>
      parseInt(state.currentTime)
    ,
    duration: state =>
      state.currentTime/state.duration*100
    ,
    coverImgUrl:state => {
      if(typeof state.song.albummid === 'undefined')
        return def.DEFAULT_IMG
      else
        return "https://y.gtimg.cn/music/photo_new/T002R500x500M000"+state.song.albummid+".jpg"
    }
  }
}
