import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Marketplace from '@/pages/Marketplace.vue'
import CreateRequest from '@/pages/CreateRequest.vue'
import Requests from '@/pages/Requests.vue'

const routes = [
  { path: '/', component: Marketplace },
  { path: '/user', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/requests', component: Requests, meta: { requiresAuth: true } },
  {
    path: '/create-request',
    component: CreateRequest,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.token) {
    next('/login')
  } else {
    next()
  }
})

export default router
