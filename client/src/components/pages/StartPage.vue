<template lang="pug">
  .wrapper.overlay.h-100
    .absolute.anlge-bg
    headerFixed
    .container.d-flex.header__title
      .row.ustify-content-center.align-self-center
        .col-md-8.text-left.align-middle
          h1 WhatEvening
          p Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero ex inventore vel error quibusdam animi fugiat, doloribus dolores consectetur nulla deleniti sint blanditiis quod debitis quis vitae officiis tempora numquam.
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

<style lang="scss">
  .anlge-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url('/static/angle-bg.png') no-repeat scroll center bottom -120px / 100% auto;
  }
  .header {
    &__title {
      height: calc(100% - 56px);
    }
  }
  .overlay:before,
  .sky-bg {
    background: #75cbe7;
    background: -webkit-gradient(linear, left top, left bottom, from(#75cbe7), to(#138fc2));
    background: linear-gradient(to bottom, #75cbe7 0%, #138fc2 100%);
    color: #ffffff;
  }
  .overlay:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8
  }
</style>
