<template lang="pug">
  .callback Callback
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
