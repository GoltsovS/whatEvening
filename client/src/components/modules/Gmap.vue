<template lang="pug">
  .gmap-container
    .gmap-autocomplete__container.d-flex.mb-3(v-if="gmapAutocomplete")
      gmap-autocomplete.form-control(@place_changed="setPlace")
      button.btn.btn-success.ml-2(@click="addMarker") Добавить
    GmapMap(:center="center"
            :zoom="12"
            ref="map"
            map-type-id="roadmap"
            :style='styleMap')
      GmapMarker(v-if="gmapAutocomplete"
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                @click="center=m.position")
      GmapMarker(v-if="!gmapAutocomplete"
                 :key="index"
                 :clickable="true"
                 v-for="(m, index) in this.getAllEvents"
                 :position="m.coords"
                 @click="toggleInfoWindow(m,index)")
      gmap-info-window(:options="infoOptions"
                       :position="infoWindowPos"
                       :opened="infoWinOpen"
                       @closeclick="infoWinOpen=false") {{infoContent}}
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
  props: ['gmapAutocomplete', 'styleMap', 'getAllEvents'],
  data () {
    return {
      center: {lat: 45.508, lng: -73.587},
      markers: [],
      places: [],
      currentPlace: null,
      currentEvent: [],
      currentMidx: null,
      infoContent: '',
      infoWindowPos: null,
      infoWinOpen: false,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    }
  },
  methods: {
    setPlace (place) {
      this.currentPlace = place
    },
    addMarker (e) {
      e.preventDefault()
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        }
        this.markers.push({position: marker})
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
        this.$emit('setCoords', {
          coords: marker
        })
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.marker = this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    },
    toggleInfoWindow: function (marker, idx) {
      this.infoWindowPos = marker.coords
      this.infoContent = marker.title + ': ' + marker.description

      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    }
  },
  mounted () {
    this.geolocate()
  }
}
</script>

<style lang="scss" scope>
  .gmap-container {
    width: 100%;
    height: 100%;
  }
</style>
