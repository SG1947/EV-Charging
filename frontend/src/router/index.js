import { createRouter, createWebHistory } from 'vue-router';
import Chargers from '../views/Chargers.vue';
import ChargerForm from '../views/ChargerForm.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import { useAuthStore } from '../store/auth';
import MapView from '../views/MapView.vue'
const routes = [
  { path: '/', redirect: '/chargers' },
  { path: '/chargers', component: Chargers },
  { path: '/chargers/add', component: ChargerForm, meta: { requiresAuth: true } },
  { path: '/chargers/edit/:id', component: ChargerForm, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {path: '/map',component: MapView}

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
