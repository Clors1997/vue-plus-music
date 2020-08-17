const player = new QMplayer({ target: 'auto' })
var global_url = ''
var p = null;
console.log(Player.TARGET)
/* IF_TRUE_APP */
function sMset(url) {
  soundManager.setup({
    onready: function() {
      soundManager.createSound({
        id: 'msg',
        autoLoad: true,
        autoPlay: false,
        url
      });
    }
  });
}
/* END_TRUE_APP */
player.on('play', () => {
  console.log(player.data)
});
player.on("pause", () => {

});
export default {
  state: {
    playing: false
  },
  mutations: {
    play(state, test_url) {
      console.log(global_url != test_url.url,1111)
      // player.play('003O1P6B2NQVF0')
      /* IF_TRUE_APP */
      if(global_url != test_url.url){
        global_url = test_url.url;
        sMset(test_url.url)
      }
      soundManager.play('msg');
      /* END_TRUE_APP */
      state.playing = true
    },
    pause(state) {
      // player.pause()
      /* IF_TRUE_APP */
      soundManager.pause('msg');
      /* END_TRUE_APP */
      state.playing = false
    }
  }
}
