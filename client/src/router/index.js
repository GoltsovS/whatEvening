import Vue from 'vue'
import Router from 'vue-router'
import Start from '@/components/pages/StartPage'
import Events from '@/components/pages/EventsPage'
import NewEvent from '@/components/pages/NewEventPage'
import EditEvent from '@/components/pages/EditEventPage'
import UserDetail from '@/components/pages/UserDetail'
import Callback from '@/components/Callback'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Start',
      component: Start
    },
    {
      path: '/events',
      name: 'Events',
      component: Events
    },
    {
      path: '/events/new',
      name: 'NewEvent',
      component: NewEvent
    },
    {
      path: '/events/:id',
      name: 'EditEvent',
      component: EditEvent
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback
    },
    {
      path: '/userDetail',
      name: 'UserDetail',
      component: UserDetail
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'UserDetail' && to.name !== 'NewEvent' && to.name !== 'EditEvent') {
    next()
  } else if (router.app.$auth.isAuthenticated()) {
    next()
  } else {
    router.app.$auth.login()
  }
})

export default router
