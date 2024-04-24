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
  {
    path: '/staff',
    name: 'Staff',
    component: () => import('../views/StaffPages/StaffTable.vue')
  },
  {
    path: '/staff/detail',
    name: 'StaffDetail',
    component: () => import('../views/StaffPages/StaffDetail.vue')
  },
  {
    path: '/staff/create',
    name: 'StaffCreate',
    component: () => import('../views/StaffPages/StaffCreate.vue')
  },
  {
    path: '/prouct-category',
    name: 'ProductCategory',
    component: () => import('../views/CategoryPages/CategoryTable.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = checkAuthentication();
  if (to.path === '/login' || to.path === '/register') {
    if (isAuthenticated) {
      next('/')
    } else {
      next();
    }
  } else {
    if (isAuthenticated) {
      next()
    } else {
      next('/login')
    }
  }
});

let checkAuthentication = () => {
  let isLoggedIn = localStorage.getItem('token');
  if (isLoggedIn !== null) {
    return false;
  } else {
    return true;
  }
}

export default router
