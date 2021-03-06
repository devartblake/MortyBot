import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import timer from './modules/timer'
import modals from './modules/modals'
import settings from './modules/settings'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    timer,
    modals,
    settings
  },
  getters,
  strict: false
})

export default store