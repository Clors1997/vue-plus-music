<template>
  <div ref="rankPage" class="rank-page">
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
        :finished-text="'~empty~'"
        @load="onLoad"
      >
        <van-cell
          v-for="(item, key) in songList"
          :key="key"
          center
          :title="item.data.albumname"
          :label="item.data.singer[0].name"
        >
          <template #right-icon>
            <van-icon name="play-circle-o" />
          </template>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import { List } from 'vant'
export default {
  name: 'RankPage',
  components: {
    [List.name]: List
  },
  filters: {
    listenCount: num => {
      return Math.round(num / 1000) / 10 + 'w'
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
      finished: false
    }
  },
  created() {
    let param = {
      api_key: 'rank_songs',
      data: {
        topid: this.topid
      }
    }
    this.$store.dispatch('apiFactory', param).then(response => {
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
    back() {
      this.$router.go(-1)
    },
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          if (this.songList.length >= this.allList.length) {
            this.finished = true
            break
          }
          this.songList.push(this.allList[this.songList.length])
        }
        this.loading = false
      }, 1000)
    }
  }
}
</script>

<style scoped lang="less">
.rank-page {
  height: 2000px;
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
  .song-list {
    margin-bottom: 65.6px;
  }
}
</style>
