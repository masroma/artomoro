//import vue router
import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
//define a routes
const routes = [
    {
        path: '/register',
        name: 'register',
        component: () => import( /* webpackChunkName: "register" */ '../views/auth/Register.vue')
    },
    {
        path: '/forgot-password',
        name: 'forgotpassword',
        component: () => import( /* webpackChunkName: "register" */ '../views/auth/ForgotPassword.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import( /* webpackChunkName: "login" */ '../views/auth/Login.vue')
    },
    {
        path: '/customer/dashboard',
        name: 'dashboard',
        component: () => import( /* webpackChunkName: "login" */ '../views/dashboard/Index.vue'),
        //chek is loggedIn
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/customer/order',
        name: 'order',
        component: () => import( /* webpackChunkName: "login" */ '../views/order/Index.vue'),
        //chek is loggedIn
        meta: {
            requiresAuth: true
        }
    },
    {
      path: '/customer/order/detail/:id',
      name: 'detail_order',
      component: () => import( /* webpackChunkName: "login" */ '../views/order/Show.vue'),
      //chek is loggedIn
      meta: {
          requiresAuth: true
      }
  },
    {
        path: '/',
        name: 'home',
        component: () => import( /* webpackChunkName: "home" */ '../views/home/Index.vue')
    },
    // {
    //     path: '/product/:slug',
    //     name: 'detail_product',
    //     component: () => import(/* webpackChunkName: "detail_product" */ '../views/product/Show.vue')
    //   },

      {
        path: '/category/:slug',
        name: 'detail_category',
        component: () => import(/* webpackChunkName: "detail_product" */ '../views/category/Show.vue')
      },

      {
        path: '/product/:slug',
        name: 'detail_product',
        component: () => import(/* webpackChunkName: "detail_product" */ '../views/product/Show.vue')
      },

      {
        path: '/cart',
        name: 'cart',
        component: () => import(/* webpackChunkName: "cart" */ '../views/cart/Index.vue'),
        meta: {
          //chek is loggedIn
          requiresAuth: true
        }
      },

      {
        path: '/checkout',
        name: 'checkout',
        component: () => import(/* webpackChunkName: "cart" */ '../views/pembayaran/Index.vue'),
        meta: {
          //chek is loggedIn
          requiresAuth: true
        }
      },

      {
        path: '/update-profile',
        name: 'update-profile',
        component: () => import( /* webpackChunkName: "login" */ '../views/auth/UpdateProfile.vue'),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/update-password',
        name: 'update-password',
        component: () => import( /* webpackChunkName: "login" */ '../views/auth/UpdatePassword.vue'),
        meta: {
            requiresAuth: true
        }
    },

]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes // <-- routes
})

//define route for handle authentication
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        //cek nilai dari getters isLoggedIn di module auth
        if (store.getters['auth/isLoggedIn']) {
        next()
        return
      }
      next('/login')
    } else {
      next()
    }
  })

export default router