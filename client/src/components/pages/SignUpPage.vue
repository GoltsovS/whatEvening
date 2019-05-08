<template lang="pug">
  .wrapper
    .container
      .row.justify-content-center
        .col-md-4
          h1
            |Регистрация нового пользователя
          form(@submit.prevent='signUp()')
            .form-group
              inputComponent(type="text"
                name="name"
                placeholder="name"
                v-model.trim="user.name")
            .form-group
              inputComponent(
                type="email"
                name="email"
                placeholder="email"
                required
                v-model.trim="user.email")
            .form-group
              inputComponent(
                type="password"
                name="password"
                placeholder="password"
                required
                v-model.trim="user.password")
            .form-group
              button.btn.btn-success.btn-block(type="submit",
                    name="signUp")
                |сохранить
            .form-group
              button.btn.btn-success.btn-block(type="button", @click="this.$router.push({name: 'Start'})")
                | вернуться на главную
</template>

<script>
import UserService from '@/services/UserService'
import inputComponent from '@/components/simple/input'
export default {
  name: 'SignUpPage',
  components: {
    inputComponent
  },
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async signUp () {
      if (this.user.email !== '' && this.user.password !== '') {
        await UserService.signUp({
          email: this.user.email,
          password: this.user.password
        }).then(res => {
          if (res.data.success) this.$router.push({name: 'Start'})
        })
      }
    }
  }
}
</script>
