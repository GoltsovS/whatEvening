<template lang="pug">
  .wrapper
    headerFixed
    .container
      h1 Главная
      p some prerender info
</template>

<script>
import headerFixed from '@/components/modules/header'
export default {
  name: 'StartPage',
  components: {
    headerFixed
  }
}
</script>
