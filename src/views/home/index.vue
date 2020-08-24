<template>
  <div class="home">
    <van-search
      ref="search"
      v-model="search_value"
      shape="round"
      :show-action="searchFlag"
      background="#4fc08d"
      placeholder="搜索 歌曲/专辑/歌手"
      @search="onSearch"
      @click="showSearch"
    >
      <template #action>
        <transition name="van-slide-right">
          <div v-if="searchFlag2" class="search-cancel" @click="closeSearch">
            取消
          </div>
        </transition>
      </template>
    </van-search>
    <div class="main">
      <home-tab v-show="!searchFlag"></home-tab>
      <search-tab v-if="searchFlag" :searchResult="search_result"></search-tab>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import { List, Cell, Notify, Calendar, Skeleton, Search } from 'vant'
import HomeTab from '@/views/home-tab'
import searchTab from '@/views/search-tab'
import { format, DATE_FMT } from '@/utils/date'

export default {
  name: 'Home',
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [Calendar.name]: Calendar,
    [Skeleton.name]: Skeleton,
    [Search.name]: Search,
    [HomeTab.name]: HomeTab,
    [searchTab.name]: searchTab
  },
  computed: {
    ...mapState({
      searchFlag: state => state.CachePageService.cacheFlag.search,
    })
  },
  data() {
    return {
      currentDate: format(new Date(), DATE_FMT),
      show: false,
      calendarShow: false,
      skeletonShow: true,
      search_value: '',
      search_result: {
      },
      active: 0,
      searchFlag2: false,
      routerName: this.$route.name,
      search_read: false
    }
  },
  created() {
    console.log('home create')
  },
  methods: {
    ...mapMutations(['enterCache', 'backCache']),
    showPopup() {
      this.show = true
    },
    onSearch() {
      this.$store.dispatch('apiFactory', {
        api_key: "search",
        data: {
          key: this.search_value
        }
      }).then(response => {
        this.search_result = response.data.data
      })
    },
    showSearch() {
      this.enterCache('search')
      let that = this
      setTimeout(function() {
        that.searchFlag2 = true
      }, 0)
    },
    closeSearch() {
      this.searchFlag2 = false
      let that = this
      setTimeout(function() {
        that.backCache('search')
      }, 300)
    },
    loadingFail() {
      Notify({
        message: '数据加载失败',
        type: 'danger'
      })
    },
    loadingSuccess() {
      Notify({
        message: '数据加载成功',
        type: 'success'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  font-size: 16px;
  height: 100vh;
  width: 375px;
  display: flex;
  overflow: hidden;
  flex-direction: column;
}
.search-icon {
  font-size: 16px;
  line-height: inherit;
}
.main {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
}
.skeleton {
  .van-skeleton {
    display: inline-block;
    width: 50px;
    margin: 0px 20px;
    .van-skeleton__content {
      width: 50px;
    }
    .van-skeleton__row {
      height: 50px;
      margin: 17px 0px;
    }
  }
}
.search-cancel {
  color: #fff;
}
.van-search__action:active {
  background: #4fc08d;
}
</style>
