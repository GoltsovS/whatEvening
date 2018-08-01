<template lang="pug">
  .wrapper
    headerFixed
    .container.mt-3
      .row
        .col-md-2
          .user__logo(@click="updatePicture()")
            img.user__img(:src="$auth.user.picture")
            // input.user__file(type="file")
        .col-md-10.text-left
          .user__tabs.btn-group.mb-3(role="group")
            button.btn.btn-secondary.user__btn(:class="{active: condition === 1}" type="button" @click="condition = 1") Персональные данные
            button.btn.btn-secondary.user__btn(:class="{active: condition === 2}" type="button" @click="condition = 2") Созданные мероприятия
            button.btn.btn-secondary.user__btn(:class="{active: condition === 3}" type="button" @click="condition = 3") Архив заявок
          table(v-if="condition === 1")
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
          table(v-if="condition == 2")
            tr
              td
                h2 События
          table(v-if="condition == 3")
            tr
              td
                h2 Архив заявок
</template>

<script>
import headerFixed from '@/components/modules/header'
import UserServise from '@/services/UserServise'
export default {
  name: 'UserDetail',
  data () {
    return {
      user_id: '',
      condition: 1
    }
  },
  components: {
    headerFixed
  },
  methods: {
    async updatePicture () {
      await UserServise.updateUserPicture({
        picture: this.picture,
        userId: this.$auth.user.sub
      }).then(response => {
        // todo: handle response
        console.log(response)
      })
    }
  }
}
</script>

<style lang="scss">
  .user {
    &__btn {
      padding: 30px;
    }
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
      width: 120px;
      height: 120px;
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
          line-height: 120px;
        }
      }
    }
  }
</style>
