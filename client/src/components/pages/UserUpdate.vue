<template lang="pug">
  .wrapper
    headerFixed
    .container.h-100
      .row.justify-content-center.align-items-center.h-100
        .col-md-6
          h1 Редактировать пользовательские данные
          form.text-left
            .form-group
              label.label(for="adress") Имя
              input.form-control(
                type="text"
                name="name"
                id="name"
                placeholder="Имя"
                v-model.trim="user.name")
            .form-group
              label.label(for="adress") Почта
              input.form-control(
                type="text"
                name="email"
                id="email"
                placeholder="Почта"
                v-model.trim="user.email")
            .form-group
              label.label(for="city") Город
              input.form-control(
                type="text"
                name="city"
                id="city"
                placeholder="Город"
                v-model.trim="data.city")
            .form-group
              label.label(for="adress") Адрес
              input.form-control(
                type="text"
                name="adress"
                id="adress"
                placeholder="Адрес"
                v-model.trim="data.adress")
            .form-group(v-if="error")
              error {{error}}
            .form-group
              button.btn.btn-success.btn-block(
                type="button"
                name="updateUserProfile"
                id="updateUserProfile"
                @click="updateProfile()")
                |Сохранить изменения
            .form-group
              router-link.btn.btn-outline-danger.btn-block(:to="{ name: 'UserDetail'}")
                |Вернуться без сохранения
</template>

<script>
import headerFixed from '@/components/modules/header'
import UserServise from '@/services/UserServise'
import {mapState} from 'vuex'
import error from '@/components/modules/Error'

export default {
  name: 'UserUpdate',
  data () {
    return {
      data: {
        city: '',
        adress: ''
      },
      error: false
    }
  },
  components: {
    headerFixed,
    error
  },
  methods: {
    async updateProfile () {
      await UserServise.updateUserProfile({
        city: this.data.city,
        adress: this.data.adress,
        userId: this.$store.state.user.data._id
      })
        .then(res => {
          if (res.data.success) {
            this.$router.push({name: 'UserDetail'})
          } else {
            this.error = res.data.message
          }
        })
        .catch(error => {
          this.error = error.response.data.message
        })
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.data
    })
  }
}
</script>
