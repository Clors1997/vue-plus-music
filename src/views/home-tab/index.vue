<template>
  <div ref="container" class="home-tab">
      <van-tabs
        v-model="active"
        color="#FFF"
        background="#4fc08d"
        title-active-color="#FFF"
        title-inactive-color="#DDD"
        @change="changeSwipe"
      >
        <van-tab title="排行榜">
        </van-tab>
        <van-tab title="推荐">
        </van-tab>
      </van-tabs>
      <van-swipe
        ref="homeSwipe"
        indicator-color="white"
        :stop-propagation="false"
        :loop="false"
        :show-indicators="false"
        @change="changeTab"
      >
        <van-swipe-item>
          <rank />
        </van-swipe-item>
        <van-swipe-item>
          <album />
        </van-swipe-item>
      </van-swipe>
  </div>
</template>

<script>
import { Tab, Tabs, Swipe, SwipeItem } from 'vant'
import Rank from './rank'
import Album from './album'

export default {
  name: 'HomeTab',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Rank.name]: Rank,
    [Album.name]: Album,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  data() {
    return {
      active: 0,
      swipeActive: 0,
      container: null
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.container = this.$refs.container;
    })
  },
  methods:{
    changeTab(index) {
      this.swipeActive = index;
      this.active = index;
    },
    changeSwipe(index) {
      if(this.swipeActive != index){
        this.$refs.homeSwipe.swipeTo(index)
      }
    }
  }
}
</script>
<style scoped lang="less">
.home-tab {
  width: 375px;
  display: flex;
  overflow: hidden;
  flex-direction: column;
}
.swiper-slide {
  height:1px !important;
} 
.swiper-slide-active {
  height:auto !important;
}
.van-swipe-item {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
}
</style>