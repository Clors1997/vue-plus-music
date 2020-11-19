<template>
  <div ref="rankPage" class="rank-page">
    <div class="in-rank-page">
      <van-sticky :container="refRankPage">
        <div
          id="singer-header"
          class="header-bar"
          :style="{
            backgroundColor: 'rgba(79, 192, 141,' + opacity + ')'
          }"
        >
          <van-icon name="arrow-left" color="#FFF" @click="back" />
        </div>
      </van-sticky>
      <div id="top-info" class="top-info">
        <van-image class="top-img" width="100vw" :src="topInfo.picDetail" />
        <van-cell
          class="top-title"
          center
          :title="topInfo.ListName"
          :label="topInfo.listennum | listenCount"
        >
          <template #icon>
            <van-icon name="fire" class="fire-icon" />
          </template>
          <template #right-icon>
            <van-icon name="play-circle-o" class="start-icon" />
          </template>
        </van-cell>
      </div>
      <div class="song-list">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="û�и�����"
          @load="onLoad"
        >
          <van-cell
            v-for="(item, key) in songList"
            :key="key"
            class="top-title"
            center
            clickable
            :title="item.data.songname"
            :label="item.data.singer[0].name"
            @click="findPlay($event, item)"
          >
            <template #right-icon>
              <div style="height: 100%;">
                <van-icon
                  name="ellipsis"
                  class="single-icon"
                  @click.stop="showPanelMethod(item)"
                />
              </div>
            </template>
          </van-cell>
        </van-list>
      </div>
    </div>
    <van-action-sheet
      v-model="showPanel"
      :actions="actions"
      :round="false"
      @select="onSelect"
    />
  </div>
</template>

<script>
import $ from 'jquery'
import { mapMutations } from 'vuex'
import { List, ActionSheet } from 'vant'
export default {
  name: 'RankPage',
  components: {
    [List.name]: List,
    [ActionSheet.name]: ActionSheet
  },
  filters: {
    listenCount: num => {
      return Math.round(num / 1000) / 10 + '万'
    }
  },
  data() {
    return {
      refRankPage: null,
      topid: this.$route.params.id,
      songList: [],
      topInfo: [],
      opacity: 0,
      allList: [],
      loading: false,
      finished: false,
      showPanel: false,
      temp_value: {},
      actions: [{ name: '立刻播放' }, { name: '加入列表' }, { name: '关闭' }]
    }
  },
  created() {
    this.$store
      .dispatch('apiFactory', {
        api_key: 'rank_songs',
        data: {
          topid: this.topid
        }
      })
      .then(response => {
        this.allList = response.data.songlist
        this.topInfo = response.data.topinfo
        console.log(this.songList)
      })
    let that = this
    window.onscroll = function() {
      if (document.getElementById('singer-header')) {
        that.opacity =
          window.pageYOffset / document.getElementById('top-info').offsetHeight
      } else {
        that.opacity = 0
      }
    }
  },
  mounted() {
    this.refRankPage = this.$refs.rankPage
  },
  methods: {
    ...mapMutations(['addSongFirst', 'addSongList']),
    back() {
      this.$router.go(-1)
    },
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 20; i++) {
          if (this.songList.length >= this.allList.length) {
            this.finished = true
            break
          }
          this.songList.push(this.allList[this.songList.length])
        }
        this.loading = false
      }, 1000)
    },
    onSelect(item) {
      switch (item.name) {
        case '立刻播放':
          this.findPlayNotEl(this.temp_value)
          break
        case '加入列表':
          this.addSongList({
            id: this.temp_value.data.songid,
            name: this.temp_value.data.songname,
            singer: this.temp_value.data.singer[0].name,
            mid: this.temp_value.data.songmid
          })
          break
        case '关闭':
        default:
          break
      }
      this.showPanel = false
    },
    findPlay(e, value) {
      this.showA(e)
      this.addSongFirst({
        id: value.data.songid,
        name: value.data.songname,
        singer: value.data.singer[0].name,
        mid: value.data.songmid
      })
    },
    findPlayNotEl(value) {
      this.addSongFirst({
        id: value.data.songid,
        name: value.data.songid,
        singer: value.data.singer[0].name,
        mid: value.data.songmid
      })
    },
    showPanelMethod(value) {
      this.temp_value = value
      this.showPanel = true
    },
    showA(e) {
      let h =
        document.documentElement.clientHeight || document.body.clientHeight
      let $i = $('<span/>').text('♪')
      let top = document.body.scrollTop + document.documentElement.scrollTop
      let x = e.pageX,
        y = e.pageY
      $i.css({
        'z-index': 99999,
        bottom: h - y,
        left: x,
        'font-size': '30px',
        position: 'absolute',
        'font-weight': 'bold',
        color: '#4fc08d'
      })
      $('body').append($i)
      $i.animate({ bottom: 20 - top, opacity: 0 }, 1700, function() {
        $i.remove()
      })
    }
  }
}
</script>

<style scoped lang="less">
.rank-page {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  height: 100vh;

  .in-rank-page {
    overflow-y: auto;
    position: relative;
    padding-bottom: 66px;
  }

  .header-bar {
    width: 375px;
    height: 40px;
    font-size: 30px;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 2;
  }
  .top-info {
    position: relative;
    height: 100vw;
    .top-img {
      position: absolute;
    }
    .top-title {
      background: -webkit-linear-gradient(
        top,
        rgba(79, 192, 141, 0),
        rgb(79, 192, 141)
      );
      position: absolute;
      bottom: 0;
      height: 50px;
      width: 375px;
      .van-cell__title {
        color: #fff;
        span {
          font-size: 18px;
        }
        .van-cell__label {
          margin-top: 0px;
          color: #eee;
        }
      }
      .fire-icon {
        font-size: 25px;
        margin-right: 10px;
        color: #fff;
        line-height: inherit;
      }
      .start-icon {
        font-size: 30px;
        color: #fff;
        line-height: inherit;
      }
    }
  }
  .single-icon {
    font-size: 20px;
    line-height: inherit;
  }
  .music-dort {
    position: absolute;
    top: 300px;
    z-index: 1000;
    left: 32px;
  }
}
.down-enter-active,
.down-leave-active {
  will-change: top;
  transition: all 0.3s;
  top: 300px;
}
.down-enter {
  top: 300px;
}
.down-leave-active {
  top: 770px;
}
</style>
