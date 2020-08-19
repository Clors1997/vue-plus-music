<template>
  <div class="play-detail">
    <div class="detail-header">
      <van-image width="100vw" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      <van-slider v-model="value" class="music-slider" bar-height="1.5vw">
       <template #button>
          <div class="custom-button">
            
          </div>
        </template>
      </van-slider>
    </div>
    
    <div class='lyric'>
      <lyric :songid="song.id" :currentTime="currentTime"></lyric>
    </div>
  </div>
</template>

<script>
import Lyric from "./lyric"
import {mapMutations, mapState, mapGetters} from 'vuex'
export default {
  name: 'PlayDetail',
  components: {
    [Lyric.name]: Lyric
  },
  computed: {
    ...mapGetters([
      'currentTime', 'duration'
    ]),
    ...mapState({
      song: state => state.PlayService.firstSong
    })
  },
  data() {
    return {
      value: 50
    }
  },
  methods: {
    
  }
}
</script>

<style scoped lang="less">
.play-detail {
  position: fixed;
  height: 100vh;
  bottom: 0;
  z-index: 8888;
  display: flex;
  flex-direction: column;
  .lyric {
    flex: 1;
    background-color: #FFF;
  }
  .detail-header {
    display: flex;
    flex-direction: column;
  }
  .van-slider {
    border-radius: 50px;
  }
  .van-slider::before {
    top: 0 !important;
    bottom: 0 !important;
  }
}
</style>
