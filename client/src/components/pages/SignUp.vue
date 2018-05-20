<template lang="pug">
  section
    .container
      .row.d-flex.justify-content-center
        form.form.col-3.justify-content-center
          div.form-group
            h1 Регистрация
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
                  name="email",
                  id="email",
                  placeholder="email",
                  v-model.trim="user.email")
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
                  @click="addUser")
                  |зарегистрироваться
</template>

<script>
import UserServise from '@/services/UserServise'
export default {
  name: 'SignUp',
  data () {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async addUser () {
      if (this.user.username !== '' && this.user.email !== '' && this.user.password !== '') {
        await UserServise.addNewUser({
          username: this.user.username,
          email: this.user.email,
          password: this.user.password
        })
      } else {
        alert('Заполните поля!')
      }
    }
  }
}
</script>
