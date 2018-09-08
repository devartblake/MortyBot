import Vue from 'vue'
import Cookies from 'js-cookie'

import './styles/normalize.css'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css

import iView from 'iview'
import 'iview/dist/styles/iview.css'

import App from './App'
import router from './router'
import store from './store'

import Vuebar from 'vuebar'
import VueShortkey from 'vue-shortkey'

import './permission' // permission control

import * as filters from './filters'

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

require('autolink-js')

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

const EventBus = new Vue()

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})

Vue.use(iView)
Vue.use(Vuebar)
Vue.use(VueShortkey)

Vue.directive('focus', {
  componentUpdated: function (el) {
    el.getElementsByTagName('input')[0].focus()
  }
})

/* eslint-disable no-new */
new Vue({
  components: {App},
  template: '<App/>',
  router,
  store
}).$mount('#app')
