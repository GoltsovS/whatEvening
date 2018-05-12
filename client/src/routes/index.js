import Start from '@/components/pages/StartPage'
import Events from '@/components/pages/EventsPage'
import NewEvent from '@/components/pages/NewEventPage'
import EditEvent from '@/components/pages/EditEventPage'

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
  }
]

export default routes
