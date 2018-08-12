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
                                 :value="metadata.city")
            .form-group
              label.label(for="adress") Адрес
              input.form-control(type="text"
                                 name="adress"
                                 id="adress"
                                 placeholder="Адрес"
                                 :value="metadata.adress")
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
import {mapState, mapActions} from 'vuex'

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
    ...mapActions('user', {
      updateProfile: 'updateProfile'
    }),
    async getToken () {
      await UserServise.getAccessToken()
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
