<template lang="pug">
  .container
    .page-title Главная
    .row
      .col-6
        router-link( :to="{ name: 'NewEvent' }" )
          | добавить событие
      .col-6
        router-link( :to="{ name: 'Events' }" )
          | перейти к событиям

</template>

<script>
export default {
  name: 'StartPage'
}
</script>
