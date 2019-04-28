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
            .form-group
              button.btn.btn-success.btn-block(type="submit",
                    name="signIn")
                |Войти
            .form-group
              button.btn.btn-outline-danger.btn-block(type="button", @click="this.$router.push({name: 'Start'})")
                |Вернуться на главную
</template>

<script>
import inputComponent from '@/components/simple/input'
import { mapActions } from 'vuex'
import error from '@/components/modules/Error'
export default {
  name: 'SingInPage',
  components: {
    inputComponent,
    error
  },
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      error: false
    }
  },
  methods: {
    async signIn () {
      if (this.user.email !== '' && this.user.password !== '') {
        await this.$auth.login({
          email: this.user.email,
          password: this.user.password
        }).then(res => {
          if (res.data.auth) {
            this.getUserData()
            this.$store.dispatch('user/setAuth', true)
            this.$router.push({name: 'Events'})
          } else {
            this.error = res.data.message
          }
        }).catch(error => {
          this.error = error.response.data.message
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
