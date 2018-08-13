<template lang="pug">
  .wrapper
    headerFixed
    .container
      .row.justify-content-center
        .col-md-6
          h1 Редактировать пользовательские данные
          form.text-left
            .form-group
              label.label(for="city") Город
              input.form-control(type="text"
                                 name="city"
                                 id="city"
                                 placeholder="Город"
                                 :value="this.metadata.city"
                                 @input="updateCityStore")
            .form-group
              label.label(for="adress") Адрес
              input.form-control(type="text"
                                 name="adress"
                                 id="adress"
                                 placeholder="Адрес"
                                 :value="this.metadata.adress"
                                 @input="updateAdressStore")
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
import {mapState} from 'vuex'

export default {
  name: 'UserUpdate',
  data () {
    return {
      condition: 1,
      error: ''
    }
  },
  components: {
    headerFixed
  },
  methods: {
    async getToken () {
      await UserServise.getAccessToken()
    },
    async updateProfile () {
      // You can see changes only in next login.
      // todo: add method for update authResult.idTokenPayload
      await UserServise.updateUserProfile({
        city: this.$store.state.user.metadata.city,
        adress: this.$store.state.user.metadata.adress,
        userId: this.$store.state.user.data.sub
      })
        // add alert to UserDetail, and error handler
        .then(result => {
          this.$router.push({name: 'UserDetail'})
        })
    },
    updateCityStore (e) {
      this.$store.commit('user/updateCity', e.target.value)
    },
    updateAdressStore (e) {
      this.$store.commit('user/updateAdress', e.target.value)
    }
  },
  computed: {
    ...mapState({
      metadata: state => state.user.metadata
    })
  },
  created () {
    this.getToken()
  }
}
</script>
