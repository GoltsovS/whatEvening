import Vue from 'vue'
import store from '@/store/index'
import Router from 'vue-router'
import Start from '@/components/pages/StartPage'
import Events from '@/components/pages/EventsPage'
import NewEvent from '@/components/pages/NewEventPage'
import EditEvent from '@/components/pages/EditEventPage'
import UserDetail from '@/components/pages/UserDetail'
import UserUpdate from '@/components/pages/UserUpdate'
import SignUp from '@/components/pages/SignUpPage'
import SignIn from '@/components/pages/SignInPage'
import Callback from '@/components/Callback'
import AuthServise from '@/auth/AuthServise'

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
      component: Events,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/events/new',
      name: 'NewEvent',
      component: NewEvent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/events/:id',
      name: 'EditEvent',
      component: EditEvent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback
    },
    {
      path: '/user/detail',
      name: 'UserDetail',
      component: UserDetail,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user/update',
      name: 'UserUpdate',
      component: UserUpdate,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user.isAuth && AuthServise.isAuth() === null) {
      next({
        path: '/signin',
        query: { redirect: to.fullPath }
      })
    } else {
      store.dispatch('user/setAuth', true)
      next()
    }
  } else {
    next()
  }
})

export default router
