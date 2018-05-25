<template lang="pug">
  yandex-map(:coords="[54.62896654088406, 39.731893822753904]"
             zoom="10"
             style="width: 100%; height: 100%;"
             :cluster-options="{1: {clusterDisableClickZoom: true}}"
             :behaviors="['ruler']"
             :controls="['trafficControl']"
             :placemarks="placemarks"
             map-type="hybrid")
    ymap-marker(marker-type="placemark"
                :coords="[54.7, 39.7]"
                hint-content="Hint content 1"
                :balloon="{header: 'header', body: 'body', footer: 'footer'}"
                :icon="{color: 'green', glyph: 'cinema'}"
                cluster-name="1")
</template>

<script>
import Vue from 'vue'
import YmapPlugin from 'vue-yandex-maps'

Vue.use(YmapPlugin)

export default {
  data () {
    return {
      placemarks: [
        {
          coords: [55.63903679459523, 37.73821648502257],
          properties: {}, // define properties here
          options: {}, // define options here
          clusterName: '1',
          callbacks: { click: function () {} }
        }]
    }
  }
}
</script>
