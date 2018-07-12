<template lang="pug">
  .wrapper
    headerFixed
    .events
      .events__container
        h3
          | Список всех доступных вам мероприятий
        section.panel.panel-success( v-if="events" )
          table.table.table-striped
            tr
              th Название
              th Описание
              th Действие
            tr( v-for="(event, index) in events", :key="event.title" )
              td {{ event.title }}
              td {{ event.description }}
              td
                router-link(:to="{name: 'EditEvent', params: {id: event._id}}")
                  |редактировать
                button.btn.btn-danger.btn-sm(type="button", @click="removeEvent(event._id)")
                  |удалить
        section.panel.panel-danger(v-if="events.length == '0'")
          p
            | There are no event ... Lets add one now!
          div
            router-link( :to="{ name: 'NewEvent' }" )
              | add new event
      .events__map
        Gmap
</template>

<script>
import headerFixed from '@/components/modules/header'
import EventsServise from '@/services/EventsServise'
import Gmap from '@/components/Gmap'
export default {
  name: 'EventsPage',
  data () {
    return {
      events: []
    }
  },
  components: {
    headerFixed,
    Gmap
  },
  methods: {
    async getEvents () {
      const responce = await EventsServise.fetchEvents()
      this.events = responce.data.events
    },
    async removeEvent (value) {
      await EventsServise.deleteEvent(value)
      this.getEvents()
    }
  },
  mounted () {
    this.getEvents()
  }
}
</script>

<style lang="scss">
  .events {
    display: flex;
    height: calc(100% - 56px);
    &__container {
      width: 40%;
      background: rgba(0,0,0,0.2);
    }
    &__map {
      width: 60%;
    }
  }
  .table {
    th {
      background: #69c3e8;
    }
  }
</style>
