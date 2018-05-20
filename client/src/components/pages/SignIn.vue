<template lang="pug">
  section
    .container
      .row.d-flex.justify-content-center
        form.form.col-8.col-md-4.justify-content-center
          div.form-group
            h1 Вход
          div.form-group
            img.form-img(src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120")
          div.form-group
            input(type="text",
                  class="form-control",
                  name="username",
                  id="username",
                  placeholder="Username",
                  v-model.trim="user.username")
          div.form-group
            input(type="text",
                  class="form-control",
                  name="password",
                  id="password",
                  placeholder="Password",
                  v-model.trim="user.password")
          div
            button(type="submit",
                  class="btn btn-primary"
                  @click="signIn")
                  |Войти
</template>

<script>
import SignServise from '@/services/SignServise'
export default {
  name: 'SignIn',
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async signIn () {
      if (this.user.username !== '' && this.user.password !== '') {
        await SignServise.signIn({
          username: this.user.username,
          password: this.user.password
        })
      } else {
        alert('Заполните поля!')
      }
    }
  }
}
</script>

<style lang="scss">
  .form-img {
    border-radius: 50%;
  }
</style>
