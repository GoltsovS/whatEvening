<template lang="pug">
  section.edit
    .container
      headerFixed
    h1
      |редактировать событие
    form(@submit.prevent="editEvent()")
      div
        input(type="text",
              name="title",
              id="title",
              placeholder="Title",
              v-model.trim="event.title")
      div
        input(type="text",
              name="description",
              id="description",
              placeholder="Description",
              v-model.trim="event.description")
      div
        button(type="submit",
               name="editEvent")
          |редактировать
      div
        router-link(:to="{name: 'Events'}")
          |вернуться к списку событий
</template>

<script>
import headerFixed from '@/components/modules/header'
import EventsServise from '@/services/EventsServise'
export default {
  name: 'EditEventPage',
  components: {
    headerFixed
  },
  data () {
    return {
      event: {
        title: '',
        description: ''
      }
    }
  },
  methods: {
    async getEvent () {
      const response = await EventsServise.getEvent({id: this.$route.params.id})
      this.event.title = response.data.title
      this.event.description = response.data.description
    },
    async editEvent () {
      if (this.event.title !== '' && this.event.description !== '') {
        await EventsServise.updateEvent({
          id: this.$route.params.id,
          title: this.event.title,
          description: this.event.description
        })
        this.$router.push({name: 'Events'})
      }
    }
  },
  mounted () {
    this.getEvent()
  }
}
</script>
