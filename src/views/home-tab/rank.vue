<template>
  <div class="rank">
    <ul>
      <li v-for="(item, key) in rankList" :key="key" class="rank-item">
        <template v-if="rankLoading">
          <van-skeleton class="skeleton" :row="1" />
        </template>
        <template v-else>
          <div class="rank-media" @click="toRankPage(item.id)">
            <img v-lazy="item.picUrl" alt="" />
            <span class="listen-count">
              {{ item.listenCount | listenCount }}
            </span>
          </div>
          <div class="rank-info" @click="toRankPage(item.id)">
            <div class="rank-title">
              {{ item.topTitle }}
            </div>
            <div
              v-for="(song, index) in item.songList"
              :key="index"
              class="rank-songs"
            >
              {{ index + 1 }}
              {{ song.songname }}
              <span class="rank-singername">-{{ song.singername }}</span>
            </div>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Rank',
  filters: {
    listenCount: num => {
      return Math.round(num / 1000) / 10 + '万'
    }
  },
  data() {
    return {
      rankList: null,
      rankLoading: true
    }
  },
  created: function() {
    this.rankList = [
      {
        id: 4,
        listenCount: 9400000,
        picUrl:
          'http://y.gtimg.cn/music/photo_new/T003R300x300M000000FAXxl4cLpjO.jpg',
        songList: [
          {
            singername: 'TFBOYS',
            songname: '和你在一起'
          },
          {
            singername: 'TFBOYS',
            songname: '和你在一起'
          },
          {
            singername: 'TFBOYS',
            songname: '和你在一起'
          }
        ],
        topTitle: '巅峰榜·流行指数',
        type: 0
      }
    ]
    setInterval(() => {
      this.rankLoading = false
    }, 1000)
    this.$store.dispatch('apiFactory', {
      api_key: 'rank_list',
      data: {}
    }).then(response => {
      console.log(JSON.parse(response.bodyText).data.topList)
      this.rankList = JSON.parse(response.bodyText).data.topList
    })
  },
  methods: {
    toRankPage(id) {
      this.$router.push({ name: 'RankPage', params: { id } })
    }
  }
}
</script>

<style scoped lang="less">
.skeleton {
  flex: 1;
  width: 100vw;
  padding: 0;
  margin: 0;
  .van-skeleton__content {
    width: 100%;
    height: 100%;
    margin: 0;
  }
  .van-skeleton__row {
    width: 100% !important;
    height: 100%;
    margin: 0;
  }
}
.rank {
  width: 100%;
  ul {
    padding: 10px;
    display: flex;
    flex-direction: column;
    list-style: none;
  }
}
.rank-item {
  display: flex;
  flex-direction: row;
  margin: 5px;
  height: 100px;
  background: #fff;
  box-shadow: 0 0 10px #ddd;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  .rank-media {
    width: 100px;
    height: 100px;
    position: relative;
    img {
      width: 100px;
      height: 100px;
      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
      z-index: 0;
    }
    .listen-count {
      position: absolute;
      bottom: 3px;
      left: 5px;
      color: #fff;
      font-size: 12px;
    }
  }
  .rank-info {
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
    .rank-title {
      margin: 2px 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .rank-songs {
      font-size: 10px;
      margin: 2px 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .rank-singername {
      color: #8f8f8f;
    }
  }
}
</style>
