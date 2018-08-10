<template lang="pug">
  .wrapper
    headerFixed
    .events
      .events__container
        beat-loader(:loading="loading")
        section.panel.panel-success(v-if="events && !loading")
          .event.p-1.pr-3.text-left(v-for="(event, index) in events"
                                    :key="event.title"
                                    @click="setCurrentEvent(event)")
            p.event__title {{event.title}}
            p.event__description {{event.description}}
            .event__nav.text-right(v-if="$auth.user.sub && ($auth.user.sub === event.user.id)")
              router-link.btn.btn-secondary.btn-sm.event__edit(:to="{name: 'EditEvent', params: {id: event._id}}")
                icon(name="edit")
              button.btn.btn-danger.btn-sm.event__remove(type="button"
                                                         @click="removeEvent(event._id)")
                icon(name="times")
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
import EventsServise from '@/services/EventsServise'
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
      await EventsServise.deleteEvent(value)
    },
    ...mapActions('events', {
      getEvents: 'getEvents',
      setCurrentEvent: 'setCurrentEvent'
    })
  },
  computed: {
    ...mapState({
      events: state => state.events.items
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
    cursor: pointer;
    &__description {
      font-size: .7rem;
    }
    &__edit {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
    &__remove {
      width: 34px;
      position: absolute;
      top: 10px;
      right: 10px;
    }
    &__title {
      font-weight: bold;
    }
    &:hover {
      background: rgb(230,230,230);
    }
  }
</style>
