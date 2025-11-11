import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductView from '@/views/ProductView.vue'
import FakturaView from '@/views/FakturaView.vue'
import { ROUTENAMES } from '@/router/routes.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTENAMES.HOME,
      component: HomeView,
    },
    {
      path: '/product',
      name: ROUTENAMES.PRODUCT,
      component: ProductView,
    },
    {
      path: '/category',
      name: ROUTENAMES.CATEGORY,
      component: () => import('../views/CategoryView.vue'),
    },
    {
      path: '/faktura',
      name: ROUTENAMES.FAKTURA,
      component: () => import('../views/FakturaView.vue'),
    },
  ],
})

export default router
