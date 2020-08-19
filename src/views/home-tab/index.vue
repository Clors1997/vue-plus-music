<template>
  <div>
    <van-sticky>
      <van-tabs
        v-model="active"
        color="#FFF"
        background="#4fc08d"
        title-active-color="#FFF"
        title-inactive-color="#DDD"
        @change="changeSwipe"
      >
        <van-tab title="排行榜">
          <!-- <rank /> -->
        </van-tab>
        <van-tab title="推荐">
          <!-- <album /> -->
        </van-tab>
      </van-tabs>
    </van-sticky>
    
    <van-swipe
      ref="homeSwipe"
      class="my-swipe"
      indicator-color="white"
      :stop-propagation="false"
      :loop="false"
      :show-indicators="false"
      @change="changeTab"
    >
      <van-swipe-item>
        <rank style="height: 100vh;" />
      </van-swipe-item>
      <van-swipe-item>
        <album style="height: 100vh;" />
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
      swipeActive: 0
    }
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
<style scoped>
.swiper-slide {
  height:1px !important;
} 
.swiper-slide-active {
  height:auto !important;
}
</style>