<template lang="pug">
  .wrapper
    .container.h-100
      .row.justify-content-center.align-items-center.h-100
        .col-md-4
          h1
            |Войти
          form(@submit.prevent='signIn()')
            .form-group
              input.form-control(
                name="email"
                type="email"
                placeholder="email"
                v-model.trim="user.email"
              )
            .form-group
              input.form-control(
                name="password"
                type="password"
                placeholder="password"
                v-model.trim="user.password"
              )
            .form-group(v-if="error")
              error {{error}}
            beat-loader(:loading="isLoading")
            .form-group
              button.btn.btn-success.btn-block(type="submit",
                    name="signIn")
                |Войти
            .form-group
              button.btn.btn-outline-danger.btn-block(type="button", @click="this.$router.push({name: 'Start'})")
                |Вернуться на главную
</template>

<script>
import { mapActions } from 'vuex'
import error from '@/components/modules/Error'
import BeatLoader from 'vue-spinner/src/BeatLoader'
export default {
  name: 'SingInPage',
  components: {
    error,
    BeatLoader
  },
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      isLoading: false,
      error: false
    }
  },
  methods: {
    async signIn () {
      if (this.user.email !== '' && this.user.password !== '') {
        this.isLoading = true
        await this.$auth.login({
          email: this.user.email,
          password: this.user.password
        }).then(res => {
          this.isLoading = false
          if (res.data.auth) {
            this.getUserData()
            this.$store.dispatch('user/setAuth', true)
            this.$router.push({name: 'Events'})
          } else {
            this.error = res.data.message
            this.isLoading = false
          }
        }).catch(error => {
          this.error = error.response.data.message
          this.isLoading = false
        })
      } else {
        this.error = 'Заполните все поля!'
      }
    },
    ...mapActions('user', {
      getUserData: 'getUserData',
      setAuth: 'setAuth'
    })
  }
}
</script>
