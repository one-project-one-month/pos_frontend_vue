import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/AuthPage/Login.vue'
import Register from '../views/AuthPage/Register.vue'


const routes = [
  {
    path: '/',
    name: 'deshboard',
    component: () => import('../views/Deshboard.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/UserPages/Profile.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
