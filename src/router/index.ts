import { createRouter, createWebHistory } from 'vue-router'
import FormView from '../views/FormView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homeform',
      component: FormView,
    },
  ],
})

export default router
