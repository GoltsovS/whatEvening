<template lang="pug">
  .wrapper
    headerFixed
    .container
      .row.justify-content-center
        .col-md-4
          h1
            |редактировать событие
          form(@submit.prevent="editEvent()")
            .form-group
              input.form-control(type="text",
                    name="title",
                    id="title",
                    placeholder="Title",
                    v-model.trim="event.title")
            .form-group
              input.form-control(type="text",
                    name="description",
                    id="description",
                    placeholder="Description",
                    v-model.trim="event.description")
            .form-group
              button.btn.btn-success.btn-block(type="submit",
                    name="editEvent")
                |сохранить
            .form-group
              router-link.btn.btn-danger.btn-block(:to="{name: 'Events'}")
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
