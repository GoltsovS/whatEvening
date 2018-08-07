<template lang="pug">
  .wrapper
    headerFixed
    .user.container.mt-3
      .row
        .col-md-2
          .user__logo.mb-3(@click="updatePicture()")
            img.user__img(:src="user.picture")
        .col-md-10.text-left
          .user__tabs.btn-group.mb-3(role="group")
            button.btn.btn-secondary.user__btn(:class="{active: condition === 1}" type="button" @click="condition = 1") Персональные данные
            button.btn.btn-secondary.user__btn(:class="{active: condition === 2}" type="button" @click="condition = 2") Созданные мероприятия
            button.btn.btn-secondary.user__btn(:class="{active: condition === 3}" type="button" @click="condition = 3") Архив заявок
          .user__tab(v-if="condition === 1")
            h2.user__name {{user.name}}
            .user-info(v-if="metadata" v-bind="metadata")
              .user-info__wrap
                span.user-info__label Никнейм
                p.iser-info__text {{user.nickname}}
              .user-info__wrap(v-if="metadata.city")
                span.user-info__label Город
                p.iser-info__text {{metadata.city}}
              .user-info__wrap(v-if="metadata.adress")
                span.user-info__label Адрес
                p.iser-info__text {{metadata.adress}}
            router-link.btn.btn-outline-info.btn-sm(:to="{name: 'UserUpdate'}")
              |редактировать профиль
          .user__tab(v-if="condition == 2")
            h2 События
            p Тут будут события, которые создал пользователь
              b.pl-1 {{user.nickname}}
          .user__tab(v-if="condition == 3")
            h2 Архив заявок
</template>

<script>
import headerFixed from '@/components/modules/header'
import UserServise from '@/services/UserServise'
export default {
  name: 'UserDetail',
  data () {
    return {
      condition: 1,
      user: {
        metadata: ''
      },
      metadata: '',
      error: ''
    }
  },
  components: {
    headerFixed
  },
  methods: {
    async updatePicture () {
      await UserServise.updateUserPicture({
        picture: {'user_metadata': {'picture': 'https://hashflare.io/img/sm-200x200.jpg'}},
        userId: this.$auth.user.sub
      }).then(response => {
        // todo: handle response
        console.log(response)
        this.error = 'Ошибка'
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

<style lang="scss">
  .user {
    &__btn {
      padding: 30px;
      @media (max-width:992px) {
        padding: 5px;
      }
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
    }
    &-info {
      &__label {
        font-size: .7rem;
        color: #ccc;
      }
    }
    &__tabs {
      @media (max-width: 992px) {
        display: flex;
        flex-direction: column;
        .user__btn.btn {
          border-radius: 0;
          margin-left: 0;
        }
      }
    }
  }
</style>
