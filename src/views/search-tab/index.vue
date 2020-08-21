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
            @click="findPlay($event, item)"
          >
            <template #right-icon>
              <van-icon name="ellipsis" class="single-icon" @click.stop="showPanelMethod(item)" />
            </template>
          </van-cell>
        </div>
      </div>
    </van-list>
    <van-action-sheet
      v-model="showPanel"
      :actions="actions"
      :round="false"
      @select="onSelect" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { List, ActionSheet } from 'vant'

export default {
  name: 'SearchTab',
  props: [ 'searchResult' ],
  components: {
    [List.name]: List,
    [ActionSheet.name]: ActionSheet
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      showPanel: false,
      temp_value: {},
      actions: [{ name: '立刻播放' }, { name: '加入列表' }, { name: '关闭' }]
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
  mounted() {
  },
  methods: {
    ...mapMutations(['addSongFirst', 'addSongList']),
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
    onSelect(item) {
      switch(item.name) {
        case '立刻播放':
          this.findPlayNotEl(this.temp_value)
          break;
        case '加入列表':
          this.addSongList({
            id: this.temp_value.id,
            name: this.temp_value.name,
            singer: this.temp_value.singer,
            mid: this.temp_value.mid
          })
          break;
        case '关闭':
          break;
      }
      this.showPanel = false;
    },
    findPlay(e, value) {
      this.showA(e)
      this.addSongFirst({
        id: value.id,
        name: value.name,
        singer: value.singer,
        mid: value.mid
      })
    },
    findPlayNotEl(value) {
      this.addSongFirst({
        id: value.id,
        name: value.name,
        singer: value.singer,
        mid: value.mid
      })
    },
    showPanelMethod(value) {
      this.temp_value = value;
      this.showPanel = true;
    },
    showA(e){
      let h = document.documentElement.clientHeight || document.body.clientHeight;
      let $i = $("<span/>").text('♪');
      let top =  document.body.scrollTop + document.documentElement.scrollTop
      var x = e.pageX,y = e.pageY;
      $i.css({
          "z-index": 99999,
          "bottom": h - y,
          "left": x,
          "font-size": "30px",
          "position": "absolute",
          "font-weight": "bold",
          "color": "#4fc08d"
      });
      $("body").append($i);
      $i.animate({"bottom": 20 - top,"opacity": 0},1700,function() {
          $i.remove();
      });
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
