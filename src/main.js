import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Navigation from 'vue-navigation'
import FastClick from 'fastclick'
import BaseComponent from './base'
import CustomComponent from './components'
import VantGlobalComponent from './vant-global'
import VueResource from 'vue-resource'
Vue.use(VueResource)

import './api/index'

/* IF_TRUE_DESKTOP */
import '@vant/touch-emulator'
/* END_TRUE_DESKTOP */

import plusInit from './utils/plus.js'
Vue.prototype.$plus = plusInit

Vue.use(BaseComponent, {})
Vue.use(CustomComponent, {})
Vue.use(VantGlobalComponent, {})

Vue.config.productionTip = false

FastClick.attach(document.body)

Vue.use(Navigation, {
  router,
  store
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
