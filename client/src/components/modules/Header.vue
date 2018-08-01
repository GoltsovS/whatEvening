<template lang="pug">
  .header-fixed
    nav.navbar.navbar-expand-sm.navbar-light.bg-faded
      button.navbar-toggler(type="button" data-toggle="collapse" data-target="#nav-content" aria-controls="nav-content" aria-expanded="false" aria-label="Toggle navigation")
        span.navbar-toggler-icon
      router-link.navbar-brand( :to="{ name: 'Start' }")
        |WhatEvening
      .collapse.navbar-collapse#nav-content
        ul.navbar-nav.ml-auto
          li.nav-item
            router-link( :to="{ name: 'NewEvent' }")
              icon(name='plus')
              | добавить событие
          li.nav-item.ml-3
            router-link( :to="{ name: 'Events' }")
              icon(name="map-marker-alt")
              | перейти к событиям
          li.nav-item.ml-3
          li.nav-item.nav-item__user(v-if="$auth.isAuthenticated()")
            span.nav-item__name {{$auth.user.nickname}}
            img.nav-item__logo(:src="$auth.user.picture")
            .user-menu
              router-link.btn.user-menu__btn( :to="{ name: 'UserDetail'}")
                icon(name="user")
                | Кабинет
              button.btn.user-menu__btn( @click="$auth.logout()")
                icon(name="sign-out-alt")
                | Выйти
          li.nav-item.ml-3(v-else)
            router-link(  :to="{ name: 'UserDetail'}")
              |Войти
            span.pl-1.pr-1 |
            router-link( :to="{}" )
              | Зарегитрироваться
</template>

<script>
import Icon from 'vue-awesome'

export default {
  name: 'Header',
  components: {
    Icon
  }
}
</script>

<style lang="scss" scope>
  .header-fixed {
    background: #545b62;
  }
  .nav-item {
    &__logo {
      border-radius: 50%;
      max-height: 20px;
      max-width: 20px;
      vertical-align: middle;
    }
    &__name {
      margin-right: 5px;
      color: white;
      vertical-align: middle;
    }
    &__user {
      min-width: 150px;
      position: relative;
      &:hover {
        background: white;
        border-radius: 5px 5px 0 0;
        .nav-item__name {
          color: black;
        }
        .user-menu {
          width: 100%;
          display: block;
          position: absolute;
          top: 25px;
          right: 0;
          background: white;
          padding: 10px;
          border: 1px solid #ccc;
          border-top: none;
          border-radius: 0 0 5px 5px;
        }
      }
    }
    a {
      color: rgb(255,255,255);
    }
  }
  .navbar-light {
    z-index: 1;
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
    .user-menu__btn {
      color: blue;
    }
  }
  .router-link {
    display: block;
  }
  .fa-icon {
    vertical-align: middle;
  }
</style>
