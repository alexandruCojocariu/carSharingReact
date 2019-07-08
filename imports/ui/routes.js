import { Home, Login, Register, Dashboard, CarView, CarCreate, MapView } from './pages';

export default [
  {
    path: `/`,
    component: Home
  },
  {
    path: `/login`,
    component: Login
  },
  {
    path: `/register`,
    component: Register
  },
  {
    path: `/dashboard`,
    component: Dashboard,
    protected: true
  },
  {
    path: `/cars/create`,
    component: CarCreate,
    protected: true
  },
  {
    path: `/cars/view/:id`,
    component: CarView,
    protected: true
  },
  {
    path: `/map`,
    component: MapView,
    protected: true
  }
];
