<template lang="pug">
  .wrapper
    headerFixed
    .container.mt-3
      .row
        .col-md-3
          .user__logo(@click="updatePicture()")
            img.user__img(:src="$auth.user.picture")
            // input.user__file(type="file")
        .col-md-9.text-left
          .user__tabs.btn-group.mb-3(role="group")
            button.btn.btn-secondary(type="button") Посещенные мероприятия
            button.btn.btn-secondary(type="button") Персональные данные
            button.btn.btn-secondary(type="button") Архив заявок
          table
            tr
              td
                h2.user__name {{$auth.user.name}}
            tr
              td Никнейм:
              td {{$auth.user.nickname}}
            tr
              td ID:
              // td {{$auth.user.user_id}}
            tr(v-if="$auth.user.user_metadata")
              td Адрес:
              td {{$auth.user.user_metadata.adress}}
</template>

<script>
import headerFixed from '@/components/modules/header'
import axios from 'axios'
export default {
  name: 'UserDetail',
  data () {
    return {
      user_id: ''
    }
  },
  components: {
    headerFixed
  },
  methods: {
    async updatePicture (user) {
      console.log('клик был')
      console.log(user)
      var settings = {
        async: true,
        crossDomain: true,
        url: 'https://what-evening.auth0.com/api/v2/users',
        method: 'PATCH',
        headers: {
          'authorization': 'Bearer ABCD',
          'Access-Control-Allow-Origin': '*',
          'content-type': 'application/json'
        },
        processData: false,
        data: '{\'email\': \'jane.doe@example.com\', \'user_metadata\': {\'hobby\': \'surfing\'}, \'app_metadata\': {\'plan\': \'full\'}}'
      }
      await axios(settings)
        .then(responce => {
          console.log(responce)
        })
    }
  },
  mounted () {
    console.log(this.$auth.user)
    // console.log(localStorage.getItem('id_token'))
  }
}
</script>

<style lang="scss">
  .user {
    &__file {
      width: 100%;
      height: 100%;
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(255,255,255,0);
      font-size: 0;
      border: none;
    }
    &__img {
      max-width: 100%;
      max-height: 100%;
    }
    &__logo {
      position: relative;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;
      &:hover {
        &:before {
          content: 'изменить';
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          color: rgb(255,255,255);
          line-height: 150px;
        }
      }
    }
  }
</style>
