<template>
  <div>
    <van-tabs
      v-model="active"
      color="#FFF"
      background="#4fc08d"
      title-active-color="#FFF"
      title-inactive-color="#DDD"
      sticky
      swipeable
    >
      <van-tab title="排行榜">
        <rank />
      </van-tab>
      <van-tab title="推荐">
        <album />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
import Rank from './rank'
import Album from './album'

export default {
  name: 'HomeTab',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Rank.name]: Rank,
    [Album.name]: Album
  },
  data() {
    return {
      active: 0
    }
  }
}
</script>
