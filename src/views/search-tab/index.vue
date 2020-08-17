<template>
  <div>
    <van-list v-if="Object.keys(searchResult).length == 0" v-model="loading" :finished="finished" @load="onLoad">
      <van-cell
        v-for="(item, key) in list"
        :key="key"
        :title="key + 1 + ' ' + item.title"
        :value="item.re"
      />
    </van-list>
    <van-list v-else v-model="loading" :finished="finished" @load="onLoad">
      <div v-if="!loading">
        <div v-if="searchResult.song.count != 0">
          <van-cell center style="background-color: #4fc08d;color: #fff">
            <template #icon>
              <van-icon class="music-icon" name="music-o" />歌曲
            </template>
          </van-cell>
          <van-cell
            v-for="(item, key) in searchResult.song.itemlist"
            :key="key"
            center
            :title="item.name+'-'+item.singer"
          >
            <template #right-icon>
              <van-icon name="play-circle-o" class="single-icon" @click="findPlay(item)" />
            </template>
          </van-cell>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { List, Cell } from 'vant'

export default {
  name: 'SearchTab',
  props: [ 'searchResult' ],
  components: {
    [List.name]: List,
    [Cell.name]: Cell
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  watch: {
    searchResult: function() {
      console.log(this.searchResult.song)
      this.list = []
      this.finished = false
    }
  },
  created() {
    console.log(this.searchResult)
  },
  methods: {
    ...mapMutations(['addSongFirst']),
    onLoad() {
      console.log(this.loading)
      if(this.searchResult.length != 0){
        
      }
      setTimeout(() => {
        for (let i = 1; i < 6; i++) {
          this.list.push({
            title: '我们的歌',
            re: '76.6万'
          })
        }
        this.loading = false
        this.finished = true
      }, 1000)
    },
    findPlay(value) {
        this.addSongFirst({
          name: value.name,
          singer: value.singer,
          mid: value.mid
        })
    }
  }
}
</script>
<style scoped lang="less">
.music-icon{
  font-size: 20px;
  margin-right: 5px;
  line-height: inherit;
}
.single-icon{
  font-size: 20px;
  line-height: inherit;
}
</style>
