<template lang="pug">
  GmapMap(:center="{lat:10, lng:10}"
          :zoom="7"
          map-type-id="terrain"
          style="width: 100%; height: 300px;"
          @click="mapClick")
    GmapMarker(v-if="marker"
               :position="marker.latLng")
</template>

<script>
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBQtG5rd9o_lFFtgjCARNlWetWfDXSbL6Y',
    libraries: 'places, drawing'
  }
})

export default {
  data () {
    return {
      marker: null,
      markerInfo: ''
    }
  },
  methods: {
    mapClick (e) {
      // console.log(e.latLng)
      this.marker = {
        latLng: e.latLng
      }
    }
  }
}
</script>
