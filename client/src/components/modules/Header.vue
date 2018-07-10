<template lang="pug">
  .header-fixed
    nav.navbar.navbar-expand-sm.navbar-light.bg-faded
      button.navbar-toggler(type="button" data-toggle="collapse" data-target="#nav-content" aria-controls="nav-content" aria-expanded="false" aria-label="Toggle navigation")
        span.navbar-toggler-icon
      router-link.navbar-brand( :to="{ name: 'StartPage' }")
        |WhatEvening
      .collapse.navbar-collapse#nav-content
        ul.navbar-nav.ml-auto
          li.nav-item
            router-link( :to="{ name: 'NewEvent' }")
              | добавить событие
          li.nav-item.ml-3
            router-link( :to="{ name: 'Events' }")
              | перейти к событиям
          li.nav-item.ml-3
          li.nav-item.nav-item__user(v-if="$auth.user")
            span.nav-item__name {{$auth.user.nickname}}
            img.nav-item__logo(:src="$auth.user.picture")
            .user-menu
              router-link( :to="{ name: ''}")
                | Кабинет
              button.user-link__btn( @click="$auth.logout()")
                | Выйти
          li.nav-item.ml-3(v-else)
            router-link(  :to="{}")
              |Войти
            span |
            router-link( :to="{}" )
              | Зарегитрироваться
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scope>
  .nav-item {
    &__logo {
      border-radius: 50%;
      max-height: 20px;
      max-width: 20px;
      vertical-align: middle;
    }
    &__name {
      margin-right: 5px;
      vertical-align: middle;
    }
    &__user {
      position: relative;
      &:hover {
        .user-menu {
          display: block;
          position: absolute;
          top: 20px;
          right: 0;
          background: white;
          padding: 10px;
          border: 1px solid #ccc;
          border-top: none;
          border-radius: 0 0 10px 10px;
        }
      }
    }
  }
  .user-menu {
    display: none;
    transition: all 1s ease;
    &__btn {
      background: rgba(255,255,255,0);
      border: none;
    }
  }
  .router-link {
    display: block;
  }
</style>
