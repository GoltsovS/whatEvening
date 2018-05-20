import Start from '@/components/pages/StartPage'
import Events from '@/components/pages/EventsPage'
import NewEvent from '@/components/pages/NewEventPage'
import EditEvent from '@/components/pages/EditEventPage'
import SignUp from '@/components/pages/SignUp'
import SignIn from '@/components/pages/SignIn'

const routes = [
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
    path: '/user',
    name: 'NewUser',
    component: SignUp
  },
  {
    path: '/login',
    name: 'SignIn',
    component: SignIn
  }
]

export default routes
