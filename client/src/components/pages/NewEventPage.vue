<template lang="pug">
  .wrapper
    headerFixed
    .container
      .row.justify-content-center
        .col-md-6
          h1
            | Создать мероприятие
          form
            .form-group(v-if="event.error")
              .alert.alert-danger.p-1.pl-2.text-left {{event.error}}
            .form-group
              input.form-control(type="text", name="title", id="title", placeholder="Название мероприятия", v-model.trim="event.title")
            .form-group
              textarea.form-control(type="text", rows="5", name="description", id="description", placeholder="Описание", v-model.trim="event.description")
            .form-group
              Gmap(gmapAutocomplete
                   styleMap="width:100%; height: 300px;"
                   @setCoords="onCoords")
            .form-group
              button.btn.btn-block.btn-primary(type="button", name="addEvent", id="addEvent", @click="addEvent()")
                | создать мероприятние
            .form-group
              button.btn.btn-success.btn-block(type="button", @click="goBack()")
                | посмотреть все мероприятия
</template>

<script>
import headerFixed from '@/components/modules/header'
import EventsServise from '@/services/EventsServise'
import Gmap from '@/components/modules/Gmap'

export default {
  name: 'NewEventPage',
  data () {
    return {
      event: {
        title: '',
        description: '',
        adress: '',
        coords: '',
        error: ''
      }
    }
  },
  components: {
    headerFixed,
    Gmap
  },
  methods: {
    async addEvent () {
      console.log(this.event.adress)
      if (this.event.title !== '' && this.event.description !== '' && this.event.coords) {
        await EventsServise.addNewEvent({
          title: this.event.title,
          description: this.event.description,
          coords: {
            lat: this.event.coords.lat,
            lng: this.event.coords.lng
          },
          user: {
            id: this.$auth.user.sub
          }
        })
        this.$router.push({name: 'Events'})
      } else {
        this.event.error = 'Заполните все поля!'
      }
    },
    onCoords (data) {
      this.event.coords = data.coords
    },
    goBack () {
      this.$router.push({name: 'Events'})
    }
  }
}
</script>
