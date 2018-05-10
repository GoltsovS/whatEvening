import Start from '@/components/pages/StartPage'
import Events from '@/components/pages/EventsPage'

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
  }
]

export default routes
