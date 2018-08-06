<template lang="pug">
  .wrapper
    headerFixed
    .container
      .row.justify-content-center
        .col-md-6
          h1 Редактировать пользовательские данные
          form.text-left
            .form-group
              label.label(for="nickName") Никнейм
              input.form-control(type="text"
                                 name="nickName"
                                 id="nickName"
                                 placeholder="Никнейм"
                                 v-model.trim="user.nickname")
            .form-group
              label.label(for="city") Город
              input.form-control(type="text"
                                 name="city"
                                 id="city"
                                 placeholder="Город"
                                 v-model.trim="metadata.city")
            .form-group
              label.label(for="adress") Адрес
              input.form-control(type="text"
                                 name="adress"
                                 id="adress"
                                 placeholder="Адрес"
                                 v-model.trim="metadata.adress")
            .form-group
              button.btn.btn-success.btn-block(type="button"
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
export default {
  name: 'UserUpdate',
  data () {
    return {
      condition: 1,
      user: [],
      metadata: '',
      error: ''
    }
  },
  components: {
    headerFixed
  },
  methods: {
    async updateProfile () {
      await UserServise.updateUserProfile({
        city: this.city,
        adress: this.adress,
        userId: this.$auth.user.sub
      }).then(response => {
        if (response.data.success) {
          this.$router.push({name: 'UserDetail'})
        }
      })
    },
    async getToken () {
      await UserServise.getAccessToken()
    },
    async userMetadata () {
      this.metadata = await this.user['http://localhost:8080/user_metadata']
    }
  },
  mounted () {
    this.getToken()
    this.user = this.$auth.user
    this.$nextTick(function () {
      this.userMetadata()
    })
  }
}
</script>
