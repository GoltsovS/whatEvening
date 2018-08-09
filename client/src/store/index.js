import Vuex from 'vuex'
import Vue from 'vue'
import actions from './actions'
import events from './modules/events'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    events,
    user
  },

  state: { // = data

  },

  getters: { // = computed properties

  },

  actions,

  mutations: {

  }
})
