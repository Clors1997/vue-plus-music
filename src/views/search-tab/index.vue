<template>
  <div>
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <van-cell
        v-for="(item, key) in list"
        :key="key"
        :title="key + 1 + ' ' + item.title"
        :value="item.re"
      />
    </van-list>
  </div>
</template>

<script>
import { List, Cell } from 'vant'

export default {
  name: 'SearchTab',
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
  methods: {
    onLoad() {
      console.log(this.loading)
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
    }
  }
}
</script>
