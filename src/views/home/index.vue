<template>
  <div class="home">
    <van-search
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
    <search-tab v-if="searchFlag" :search-result="search_result" />
    <keep-alive>
      <home-tab v-if="!searchFlag" />
    </keep-alive>
    <!-- <van-list>
      <van-cell title="使用日期工具类" :value="`今天是${currentDate}`" />
      <van-cell title="你再看，地址栏有一个?VNK=xxx,这是路由缓存" />
    </van-list>
    <van-button plain type="primary" @click="loadingTest">
      测试按钮
    </van-button>
    <van-cell-group title="分组测试">
      <van-cell
        title="测试单元格"
        is-link
        arrow-direction="down"
        value="测试内容"
        @click="showPopup"
      />
    </van-cell-group>
    <van-cell title="单元格" icon="shop-o">
      <template #right-icon>
        <van-icon name="search" class="search-icon" />
      </template>
    </van-cell>
    <van-image
      width="100"
      height="100"
      lazy-load
      :src="require('@/assets/logo.png')"
    >
      <template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
      <template v-slot:error>
        加载失败
      </template>
    </van-image>
    <van-row>
      <van-col span="8">
        <van-button plain type="info" @click="loadingTest">
          加载中
        </van-button>
      </van-col>
      <van-col span="8">
        <van-button plain type="danger" @click="loadingFail">
          失败
        </van-button>
      </van-col>
      <van-col span="8">
        <van-button plain type="primary" @click="loadingSuccess">
          成功
        </van-button>
      </van-col>
    </van-row>
    <van-popup
      v-model="show"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '30%' }"
    />
    <div class="van-ellipsis">
      这是一段最多显示三行的文字，多余的内容会被省略这是一段最多显示三行的文字，多余的内容会被省略
    </div>
    <van-calendar v-model="calendarShow" :show-confirm="false" />
    <van-button type="primary" to="NoPermission">
      路由跳转-无权限
    </van-button>
    <div v-show="skeletonShow" class="skeleton">
      <van-skeleton :row="3" row-width="13.33vw" />
      <van-skeleton :row="3" row-width="13.33vw" />
      <van-skeleton :row="3" row-width="13.33vw" />
    </div>
    -->
  </div>
</template>

<script>
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
      searchFlag: false,
      searchFlag2: false
    }
  },
  created() {
  },
  methods: {
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
      this.searchFlag = true
      let that = this
      setTimeout(function() {
        that.searchFlag2 = true
      }, 0)
    },
    closeSearch() {
      this.searchFlag2 = false
      let that = this
      setTimeout(function() {
        that.searchFlag = false
      }, 200)
    },
    loadingTest() {
      const loading = this.$loading()
      setTimeout(function() {
        loading.close()
      }, 1000)
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
}
.search-icon {
  font-size: 16px;
  line-height: inherit;
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
