<template lang="pug">
  .callback.d-flex.justify-content-center.align-items-center
    BeatLoader
</template>

<script>
import BeatLoader from 'vue-spinner/src/BeatLoader'

export default {
  name: 'callback',
  components: {
    BeatLoader
  },
  mounted () {
    this.$auth.handleAuthentication().then((data) => {
      this.$router.push({name: 'Events'})
    })
  }
}
</script>

<style lang="scss">
  .callback {
    width: 100%;
    height: 100%;
  }
</style>
