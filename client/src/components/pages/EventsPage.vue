<template lang="pug">
  .wrapper
    headerFixed
    .events
      .events__container
        beat-loader(:loading="loading")
        section.panel.panel-success(v-if="events && !loading")
          .event.p-1.pr-1.text-left(
            v-for="(event, index) in events"
            :key="event.title"
            @click="setCurrentEvent(event)")
            .event__info
              p.event__title {{event.title}}
              p.event__description {{event.description}}
            .event__nav.d-flex.flex-column.justify-content-start.p-1(v-if="user._id === event.user.id")
              button.event__remove(type="button"
                @click="removeEvent(event._id)")
                icon(name="times")
              router-link.event__edit(:to="{name: 'EditEvent', params: {id: event._id}}")
                icon(name="edit")
        section.panel.panel-danger(v-if="events.length == '0'")
          p
            | На данный момент нет мероприятий... Создайте своё
          div
            router-link(:to="{name: 'NewEvent'}")
              | Добавить мероприятие
      .events__map
        Gmap(styleMap="width:100%; height: 100%;"
             :getAllEvents="events")
</template>

<script>
import headerFixed from '@/components/modules/header'
import EventsService from '@/services/EventsService'
import {mapState, mapActions} from 'vuex'
import BeatLoader from 'vue-spinner/src/BeatLoader'
import Gmap from '@/components/modules/Gmap'
import Icon from 'vue-awesome'

export default {
  name: 'EventsPage',
  data () {
    return {
      loading: true
    }
  },
  components: {
    headerFixed,
    BeatLoader,
    Gmap,
    Icon
  },
  methods: {
    async removeEvent (value) {
      await EventsService.deleteEvent(value)
    },
    ...mapActions('events', {
      getEvents: 'getEvents',
      setCurrentEvent: 'setCurrentEvent'
    })
  },
  computed: {
    ...mapState({
      events: state => state.events.items,
      user: state => state.user.data
    })
  },
  created () {
    this.getEvents()
      .then(() => {
        this.loading = false
      })
  }
}
</script>

<style lang="scss">
  .events {
    display: flex;
    height: calc(100% - 56px);
    @media (max-width: 992px) {
        flex-direction: column-reverse;
      }
    &__container {
      width: 40%;
      height: 100%;
      background: #545b62;
      overflow: auto;
      @media (max-width: 992px) {
        width: 100%;
      }
    }
    &__map {
      width: 60%;
      @media (max-width: 992px) {
        width: 100%;
        height: calc(100% - 130px);
      }
    }
  }
  .event {
    width: 100%;
    height: 130px;
    position: relative;
    background: rgb(255,255,255);
    border-bottom: 2px solid rgb(230,230,230);
    display: flex;
    flex-direction: row;
    cursor: pointer;
    &__description {
      font-size: .7rem;
    }
    &__edit {
      color: var(--white);
      &:hover {
        color: var(--green);
      }
    }
    &__info {
      flex-grow: 1;
    }
    &__nav {
      background: #545b62;
      margin: -0.25rem -0.25rem -0.25rem 0;
    }
    &__remove {
      width: 16px;
      color: var(--white);
      background: transparent;
      border: none;
      padding: 0;
      &:hover {
        color: var(--red);
      }
    }
    &__title {
      font-weight: bold;
    }
    &:hover {
      background: rgb(230,230,230);
    }
  }
</style>
