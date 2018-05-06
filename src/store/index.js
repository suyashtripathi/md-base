import Vue from 'vue'
import Vuex from 'vuex'

import meals from './meals'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    meals
  }
})

export default store
