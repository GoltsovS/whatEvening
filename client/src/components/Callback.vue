<template lang="pug">
  .callback Редирект на авторизацию
</template>

<script>
export default {
  name: 'callback',
  mounted () {
    this.$auth.handleAuthentication().then((data) => {
      this.$router.push({name: 'Events'})
    })
  }
}
</script>
