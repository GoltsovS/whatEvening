<template lang="pug">
  .gmap-container
    gmap-autocomplete.form-control(@place_changed="setPlace")
    GmapMap(:center="center"
            :zoom="7"
            ref="map"
            map-type-id="roadmap"
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
      center: {lat: 45.508, lng: -73.587},
      marker: null,
      markerInfo: '',
      currentPlace: null
    }
  },
  methods: {
    mapClick (e) {
      this.marker = {
        latLng: e.latLng
      }
    },
    setPlace (place) {
      console.log(place)
      this.currentPlace = place
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        console.log(this.center)
      })
    }
  },
  mounted () {
    this.geolocate()
  }
}
</script>
