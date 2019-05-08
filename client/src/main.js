// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/plugins/bootstrap'
import store from '@/store/index'
import auth from '@/auth/AuthService'
import VueCookie from 'vue-cookie'

Vue.use(VueCookie)
Vue.use(auth)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
