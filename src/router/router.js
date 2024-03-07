import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/page/PageHome.vue'
import Shared from '@/page/PageShared.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/shared',
      name: 'Shared',
      component: Shared
    }
  ]
})
export default router
