<template>
  <div>
    <div class="play" v-show="!playDetailFlag" @click="enterCache('playDetail')">
      <van-cell center :title="firstSong.name" :label="firstSong.singer">
        <template #icon>
          <van-image
            class="play-image"
            :class="playing ? 'play-image-turn' : 'play-image-stop'"
            fit="cover"
            round
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </template>
        <template #extra>
          <van-icon
            v-if="playing"
            class="play-icon"
            name="pause"
            color="#4fc08d"
            @click.stop="pause"
          />
          <van-icon
            v-else
            class="play-icon"
            name="play"
            color="#4fc08d"
            @click.stop="play('')"
          />
        </template>
      </van-cell>
      
    </div>
    <transition name="van-slide-up">
      <play-detail v-show="playDetailFlag"></play-detail>
    </transition>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import PlayDetail from './playDetail'
export default {
  name: 'Play',
  components: {
    [PlayDetail.name]: PlayDetail
  },
  data() {
    return {
      ss: true,
      test_url: {
        url: ''
      }
    }
  },
  watch:{
    firstSong: {
        handler: function(newdata, olddata){
          console.log(newdata)
          this.$store.dispatch('apiFactory', {
            api_key: 'get_url',
            data: {
              mid: newdata.mid
            }
          }).then(response => {
            if(response.data.url_mid.data.midurlinfo[0].purl == ''){
              this.$toast('該歌曲暫未開放o(╥﹏╥)o')
              this.default()
            }else{
              this.play(response.data.url_mid.data.midurlinfo[0].purl)
            }
          })
        },
        deep: true
     }
  },
  computed: {
    ...mapState({
      playing: state => state.PlayService.playing,
      firstSong: state => state.PlayService.firstSong,
      playDetailFlag: state => state.CachePageService.cacheFlag.playDetail,
    })
  },
  created() {
  },
  methods: {
    ...mapMutations(['play', 'pause', 'default', 'enterCache', 'backCache'])
  }
}
</script>

<style scoped lang="less">
.play {
  width: 375px;
  background-color: #ddd;
  position: fixed;
  bottom: 0;
  .play-image {
    width: 45px;
    height: 45px;
    margin-right: 10px;
    -animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;
    animation: turn 10s linear infinite forwards;
    -moz-animation: turn 10s linear infinite forwards;
    -webkit-animation: turn 10s linear infinite forwards;
    -o-animation: turn 10s linear infinite forwards;
  }
  .play-image-turn {
    animation-play-state: running;
    -webkit-animation-play-state: running;
  }
  .play-image-stop {
    animation-play-state: paused;
    -webkit-animation-play-state: paused;
  }
  .play-icon {
    font-size: 30px;
    line-height: inherit;
  }
}
@keyframes turn {
  0% {
    -webkit-transform: rotate(0deg);
  }
  25% {
    -webkit-transform: rotate(90deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  75% {
    -webkit-transform: rotate(270deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
