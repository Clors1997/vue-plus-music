<template>
  <div class="play">
    <van-cell center title="入海" label="毛不易">
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
          @click="pause"
        />
        <van-icon
          v-else
          class="play-icon"
          name="play"
          color="#4fc08d"
          @click="play(test_url)"
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'Play',
  data() {
    return {
      test_url: {
        url: ''
      }
    }
  },
  computed: {
    ...mapState({
      playing: state => state.PlayService.playing
    })
  },
  created() {
    let param1 = {
      api_key: 'get_url',
      data: {
        mid: '00221jjt01LOTE'
      }
    }
    console.log(param1)
    this.$store.dispatch('apiFactory', param1).then(response => {
      console.log(response)
      this.test_url.url = response.data.url_mid.data.midurlinfo[0].purl;
      console.log(this.test_url.url)
    })
  },
  methods: {
    ...mapMutations(['play', 'pause'])
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
