<template lang="pug">
  .header
    nav.navbar.navbar-expand-sm.navbar-light.bg-faded
      button.navbar-toggler(type="button" data-toggle="collapse" data-target="#nav-content" aria-controls="nav-content" aria-expanded="false" aria-label="Toggle navigation")
        span.navbar-toggler-icon
      a.navbar-brand(href="/") WhatEvening
      .collapse.navbar-collapse#nav-content
        ul.navbar-nav.ml-auto
          li.nav-item
            router-link( :to="{ name: 'NewEvent' }" )
              | добавить событие
          li.nav-item.ml-3
            router-link( :to="{ name: 'Events' }" )
              | перейти к событиям
          li.nav-item.ml-3
            router-link( :to="{ name: 'SignIn' }" )
              | Войти
          li.nav-item.ml-3
            router-link( :to="{ name: 'NewUser' }" )
              | Зарегитрироваться
    .container
      .page-title Главная
</template>

<script>
export default {
  name: 'StartPage'
}
</script>
