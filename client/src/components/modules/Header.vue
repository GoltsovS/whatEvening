<template lang="pug">
  .header-fixed
    nav.navbar.navbar-expand-sm.navbar-light.bg-faded
      button.navbar-toggler(type="button" @click="toggleMobileMenu()")
        span.navbar-toggler-icon
      router-link.navbar-brand(:to="{ name: 'Start' }")
        |WhatEvening
      .navbar-collapse#nav-content(v-bind:class="{ collapse: !menuActive }")
        ul.navbar-nav.ml-auto.align-items-center
          li.nav-item
            router-link( :to="{ name: 'NewEvent' }")
              icon(name='plus')
              | добавить событие
          li.nav-item.ml-3
            router-link( :to="{ name: 'Events' }")
              icon(name="map-marker-alt")
              | перейти к событиям
          li.nav-item.nav-item__user(v-if="isAuth")
            router-link.nav-item__name(:to="{ name: 'UserDetail'}")
                icon(name="user")
                | {{user.name}}
            button.nav-item__btn(@click="logout()")
                icon(name="sign-out-alt")
          li.nav-item.ml-3(v-else)
            router-link(:to="{ name: 'SignIn'}")
              |Войти
            span.pl-1.pr-1 |
            router-link(:to="{ name: 'SignUp'}")
              |Зарегитрироваться
</template>

<script>
import Icon from 'vue-awesome'
import { mapState, mapActions, mapGetters } from 'vuex'
import UserService from '@/services/UserService'

export default {
  name: 'Header',
  components: {
    Icon
  },
  data () {
    return {
      menuActive: false
    }
  },
  methods: {
    logout () {
      UserService.signOut()
      this.$store.dispatch('user/setAuth', false)
      this.$router.push({name: 'Start'})
    },
    toggleMobileMenu () {
      this.menuActive = !this.menuActive
    },
    ...mapActions('user', {
      getUserData: 'getUserData'
    })
  },
  computed: {
    ...mapState({
      user: state => state.user.data
    }),
    ...mapGetters({
      isAuth: 'user/isAuthenticated'
    })
  }
}
</script>

<style lang="scss" scope>
  .header-fixed {
    background: #545b62;
  }
  .nav-item {
    @media (max-width: 575px) {
      padding: 5px 0;
      &:first-of-type {
        padding-top: 10px;
      }
    }
    &__name {
      margin-right: 5px;
      color: white;
      vertical-align: middle;
    }
    &__user {
      min-width: 150px;
      position: relative;
    }
    &__btn {
      background: transparent;
      border: none;
      color: white;
    }
    a {
      color: rgb(255,255,255);
    }
  }
  .navbar-light {
    z-index: 2;
    .navbar-brand {
      color: rgb(255,255,255);
    }
    svg {
      margin-right: 5px;
    }
  }
  .user-menu {
    display: none;
    transition: all 1s ease;
  }
  .router-link {
    display: block;
  }
  .fa-icon {
    vertical-align: middle;
  }
</style>
