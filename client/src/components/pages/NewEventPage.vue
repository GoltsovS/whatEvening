<template lang="pug">
  .wrapper
    headerFixed
    .container
      .row.justify-content-center
        .col-6
          h1
            | Создать мероприятие
          form
            .form-group
              input.form-control( type="text", name="title", id="title", placeholder="Title", v-model.trim="event.title" )
            .form-group
              textarea.form-control( type="text", rows="5", name="description", id="description", placeholder="Description", v-model.trim="event.description" )
            .form-group
              Gmap(gmapAutocomplete)
            .form-group
              button.btn.btn-block.btn-primary( type="button", name="addEvent", id="addEvent", @click="addEvent()" )
                | создать мероприятние
            .form-group
              button.btn.btn-success.btn-block( type="button", @click="goBack()" )
                | посмотреть все мероприятия
</template>

<script>
import headerFixed from '@/components/modules/header'
import EventsServise from '@/services/EventsServise'
import Gmap from '@/components/Gmap'
export default {
  name: 'NewEventPage',
  data () {
    return {
      event: {
        title: '',
        description: '',
        coords: ''
      }
    }
  },
  components: {
    headerFixed,
    Gmap
  },
  methods: {
    async addEvent () {
      console.log(this.event.title)
      if (this.event.title !== '' && this.event.description !== '') {
        await EventsServise.addNewEvent({
          title: this.event.title,
          description: this.event.description
        })
        this.$router.push({name: 'Events'})
      } else {
        alert('Заполните поля!')
      }
    },
    goBack () {
      this.$router.push({name: 'Events'})
    }
  }
}
</script>
