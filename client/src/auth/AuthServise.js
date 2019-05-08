import Vue from 'vue'
import UserService from '@/services/UserServise'

let auth = new Vue({
  methods: {
    login (user) {
      let {email, password} = user
      return UserService.signIn({
        email: email,
        password: password
      })
    },
    logout () {
      UserService.signOut()
    },
    isAuthenticated () {
      return this.$cookie.get('token')
    }
  }
})

export default {
  install: function (Vue) {
    Vue.prototype.$auth = auth
  },
  isAuth: () => {
    return auth.isAuthenticated()
  }
}
