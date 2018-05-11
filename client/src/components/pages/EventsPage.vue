<template lang="pug">
  .container
    .row
      .col-xs-12
        h1
          | Posts
        h3
          | This file will list all the events

        section.panel.panel-success( v-if="events" )
          .panel-heading
            | list of events
          table.table.table-striped
            tr
              th Title
              th Description
              th Action
            tr( v-for="(event, index) in events", :key="event.title" )
              td {{ event.title }}
              td {{ event.description }}
        section.panel.panel-danger(v-else)
          p
            | There are no event ... Lets add one now!
          div
            router-link( :to="{ name: 'NewEvent' }" )
              | add new event
</template>

<script>
import EventsServise from '@/services/EventsServise'
export default {
  name: 'EventsPage',
  data () {
    return {
      events: []
    }
  },
  methods: {
    async getEvents () {
      const responce = await EventsServise.fetchEvents()
      this.events = responce.data.events
    }
  },
  mounted () {
    this.getEvents()
  }
}
</script>
