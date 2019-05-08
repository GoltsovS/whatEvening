<template lang="pug">
  .gmap-container
    .gmap-autocomplete__container.d-flex.mb-3(v-if="gmapAutocomplete")
      gmap-autocomplete.form-control(@place_changed="setPlace")
      button.btn.btn-success.ml-2(@click="addMarker") Добавить
    beat-loader(:loading="loading")
    GmapMap(v-if="!loading"
            :center="center"
            :zoom="zoom"
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
import BeatLoader from 'vue-spinner/src/BeatLoader'
import { mapState } from 'vuex'

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
      center: '',
      markers: [],
      places: [],
      currentPlace: null,
      currentMidx: null,
      zoom: 10,
      infoContent: '',
      infoWindowPos: null,
      infoWinOpen: false,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      loading: true
    }
  },
  components: {
    BeatLoader
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
        this.zoom = 16
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.marker = this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.loading = !this.loading
      })
    },
    toggleInfoWindow: function (marker, idx) {
      this.infoWindowPos = marker.coords
      this.infoContent = marker.title + ': ' + marker.description

      if (idx === 'undefined' || this.currentMidx !== idx) {
        this.infoWinOpen = true
      } else {
        this.infoWinOpen = !this.infoWinOpen
        this.currentMidx = idx
      }
    }
  },
  mounted () {
    this.geolocate()
    this.$store.watch(
      (state, getters) => getters['events/currentEvent'],
      (newEvent, oldEvent) => this.toggleInfoWindow(newEvent)
    )
  },
  computed: mapState(['events/currentEvent'])
}
</script>

<style lang="scss" scope>
  .gmap-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .gmap-autocomplete {
    &__container {
      width: 100%;
    }
  }
</style>
