<template lang="pug">
  yandex-map(:coords="[55.63903649459523, 37.73821648502257]"
             zoom="10"
             style="width: 100%; height: 300px;"
             :behaviors="['scrollZOom']"
             :controls="['trafficControl', 'zoomControl']"
             map-type="map")
    // ymap-marker(marker-type="placemark"
                v-for="placemark in placemarks"
                :marker-id="placemark.markerId"
                :key="placemark.markerId"
                :coords="placemark.coords"
                hint-content="Hint content 1"
                :balloon="{header: 'header', body: 'body', footer: 'footer'}"
                :icon="placemark.icon"
                cluster-name="placemark.clusterName")
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
          coords: [55.63903679454567, 37.73821648502257],
          markerId: '5',
          properties: {}, // define properties here
          options: {}, // define options here
          clusterName: '5',
          icon: {color: 'green', glyph: 'home'},
          callbacks: { click: function () {} }
        },
        {
          coords: [55.83903679454567, 37.73821148502257],
          markerId: '6',
          properties: {}, // define properties here
          options: {}, // define options here
          clusterName: '6',
          icon: {color: 'green', glyph: 'cinema'},
          callbacks: { click: function () {} }
        }
      ]
    }
  }
}
</script>
