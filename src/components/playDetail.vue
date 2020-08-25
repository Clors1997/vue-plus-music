<template>
  <div class="play-detail">
    <div class="detail-header">
      <div class="play-down">
        <van-icon name="arrow-down" @click="backCache('playDetail')" />
      </div>
      <van-image width="100vw" src="https://img.yzcdn.cn/vant/cat.jpeg" @click="backCache('playDetail')" />
      <van-slider :value="duration" class="music-slider" bar-height="1.5vw">
       <template #button>
          <div class="custom-button">
            
          </div>
        </template>
      </van-slider>
    </div>
    
    <div class="detail-body-bg">
      <div class="detail-body">
        <div class="music-info">
          <div class="music-name">{{song.name}}</div>
          <div class="music-author">{{song.singer | singer}}</div>
        </div>
        <div class='lyric'>
          <lyric :songid="song.id" :currentTime="currentTime"></lyric>
        </div>
      </div>
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
    }
  },
  filters: {
    singer: val => {
      if (typeof val === 'string') {
        return val
      } else if (val instanceof Array) {
        let singer = ''
        val.forEach(item => {
          singer = singer + item.name + ' '
        })
        return singer
      }
    }
  },
  methods: {
    ...mapMutations(['backCache'])
  }
}
</script>

<style scoped lang="less">
.play-detail {
  position: fixed;
  height: 100vh;
  bottom: 0;
  z-index: 8888;
  background-color: #FFF;
  display: flex;
  flex-direction: column;
  .play-down {
    width: 25px;
    height: 25px;
    z-index: 1000;
    border-radius: 50%;
    display: flex;
    font-size: 15px;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    top: 10px;
    left: 10px;
  }
  .detail-body-bg {
    flex: 1;
    background-image: url(../assets/bg2.jpg);
    .detail-body {
      background: rgba(255, 255, 255, 0.85);
      height: 100%;
      .music-info {
        height: 10%;
        .music-name {
          text-align: center;
          font-weight: bold;
          font-size: 18px;
          padding-top: 20px;
        }
        .music-author {
          text-align: center;
          font-size: 12px;
          color: #8f8f8f;
          margin-top: 20px;
        }
      }
      .lyric {
        height: 90%;
      }
    }
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
