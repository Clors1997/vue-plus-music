<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, key) in swipeList" :key="key">
        <img v-lazy="item.pic" class="swipe-img" />
      </van-swipe-item>
    </van-swipe>
    <div class="re">
      热门歌单
    </div>
    <van-grid :border="false" :column-num="2">
      <van-grid-item v-for="(item, key) in hotList" :key="key">
        <div style="width: 100%;">
          <van-image fit="contain" :src="item.imgurl" />
          <div>
            {{ item.dissname }}
          </div>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Grid, GridItem } from 'vant'

export default {
  name: 'Album',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  },
  data() {
    return {
      swipeList: [
        {
          fid: '29931',
          id: '003IoSVH48XlEF',
          jumpurl: '',
          packageid: 0,
          pic: 'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/2821329.jpg',
          title: '其他 说唱听我的',
          type: 10002,
          usertype: 0
        },
        {
          fid: '29889',
          id: '001ushnw3bQJww',
          jumpurl: '',
          packageid: 0,
          pic: 'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/2825691.jpg',
          title: '王俊凯《Beautiful》',
          type: 10002,
          usertype: 0
        },
        {
          fid: '29929',
          id: '004AF3C72Z8bXv',
          jumpurl: '',
          packageid: 0,
          pic: 'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/2819878.jpg',
          title: 'PCYQQ双笙&徐均朔《太初》',
          type: 10002,
          usertype: 0
        }
      ],
      hotList: [
        {
          author: '小众又怎样',
          dissid: '7653196026',
          dissname: '《乐队的夏天第二季》歌曲合集',
          imgurl:
            'http://qpic.y.qq.com/music_cover/8eiaDBJ27yYicpMibYZmmEdNIzyyoibXAondVgaiccgfiagqibfOg8VEvUXMw/300?n=1',
          listennum: 946600,
          sum: 0
        },
        {
          author: '我嘎乔安娜',
          dissid: '2670809622',
          dissname: '港乐盛世，经典粤语歌典藏',
          imgurl:
            'http://qpic.y.qq.com/music_cover/tJQS5alP1DichV9sM6pzVG0icyDlaP4ehxmOwXTqnBBhmJPX55lIHjlw/300?n=1',
          listennum: 9307040,
          sum: 0
        },
        {
          author: '貔貅',
          dissid: '1441687204',
          dissname: '游戏必备电音：我的游戏不可能这么带感！',
          imgurl:
            'http://qpic.y.qq.com/music_cover/es8seBvc4nqicYcqhqZPAXQWmmYNia3IyFEXYZK4kR3MJtbbIz7k6SfA/300?n=1',
          listennum: 19725561,
          sum: 0
        },
        {
          author: 'Apple',
          dissid: '3552291790',
          dissname: '百位韩国大热歌手 | 一人一首代表曲',
          imgurl:
            'http://qpic.y.qq.com/music_cover/YEqzCcJKAOwd4o0ib8yGnjpcIhaUr2G4LcJmflibDkx5YJTZfYcOQraA/300?n=1',
          listennum: 11814637,
          sum: 0
        },
        {
          author: 'Seve7n Day Rock',
          dissid: '2051746512',
          dissname: '游戏高燃BGM：别拦着我，我要上战场',
          imgurl:
            'http://qpic.y.qq.com/music_cover/ezXpob9biaedyoUWFJDttESkgXCPptb7k6ic75HfFuaiaYBVJRKo3tPeQ/300?n=1',
          listennum: 47563194,
          sum: 0
        },
        {
          author: '蘋果樹de約定',
          dissid: '1182456307',
          dissname: '白噪音|雷雨，伴你入睡，享受自然界的音乐',
          imgurl:
            'http://qpic.y.qq.com/music_cover/kMtw3Qq5LwPibxia6ZGQ4icS1b6I27iasyy9BBicgA6wiaPIQ0vVGZBumfibA/300?n=1',
          listennum: 5196379,
          sum: 0
        }
      ]
    }
  }
}
</script>

<style scoped>
.re {
  font-size: 12px;
  text-align: center;
  width: 100vw;
  background-color: #fff;
  padding: 3vw 0;
}
.swipe-img {
  width: 375px;
  height: 150px;
}
</style>
