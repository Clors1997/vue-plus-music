<template>
  <div id="app">
    <transition :name="transitionName">
      <navigation>
        <router-view class="router" />
      </navigation>
    </transition>
    <play></play>
  </div>
</template>
<script>
import {mapMutations, mapState, mapGetters} from 'vuex'
import Play from "@/components/play"
export default {
  components: {
    [Play.name]: Play
  },
  computed: {
    ...mapGetters([
      'hasCache'
    ])
  },
  data() {
    return {
      transitionName: 'slide-right'
    }
  },
  beforeCreate() {
    console.log(this.$route)
    /* IF_TRUE_APP */
    let that = this
    this.$plus(function() {
      
      let webview = window.plus.webview.currentWebview()
      window.plus.key.addEventListener('backbutton', function() {
        if(that.hasCache){
          that.clearCache()
        }else{
          webview.canBack(function(e) {
            if (e.canBack) {
              webview.back()
            } else {
              let first = null
              window.plus.key.addEventListener(
                'backbutton',
                function() {
                  if (!first) {
                    first = new Date().getTime()
                    that.$toast('再按一次退出')
                    setTimeout(function() {
                      first = null
                    }, 1000)
                  } else {
                    if (new Date().getTime() - first < 1500) {
                      window.plus.runtime.quit()
                    }
                  }
                },
                false
              )
            }
          })
        }
      })
    })
    /* END_TRUE_APP */
  },
  created() {
    this.$navigation.on('forward', (to, from) => {
      if(to.route.meta.transitionName != undefined){
        this.transitionName = to.route.meta.transitionName
      }else{
        this.transitionName = 'slide-right'
      }
    })
    this.$navigation.on('back', (to, from) => {
      console.log(from.route.meta.transitionName)
      if(from.route.meta.transitionName != undefined){
        this.transitionName = from.route.meta.transitionName
      }else{
        this.transitionName = 'slide-left'
      }
    })
  },
  methods: {
    ...mapMutations(['clearCache']),
  }
}
</script>

<style lang="less">
#app {
  font-family: PingFangSC-Regular;
  background-color: #fff;
  height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/** 解决路由切换动画上下闪动问题 */
.router {
  position: absolute;
  top: safe-area-inset-top;
  top: env(safe-area-inset-top);
  width: 100%;
  transition: all 0.377s ease;
  backface-visibility: hidden;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 0.3s;
  position: absolute;
  width: 100%;
  left: 0;
}
.slide-right-enter {
  transform: translateX(-100%);
}
.slide-right-leave-active {
  transform: translateX(100%);
}
.slide-left-enter {
  transform: translateX(100%);
}
.slide-left-leave-active {
  transform: translateX(-100%);
}
.bar-slide-enter-active {
  transition: all 0.3s ease;
}
.bar-slide-leave-active {
  transition: all 0.3s ease-out;
}
.bar-slide-enter,
.bar-slide-leave-active {
  margin-bottom: -50px;
}
</style>
