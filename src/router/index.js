import AllNotes from '@/pages/AllNotes.vue'
import getCookie from '@/functions/Coockies/GetCookie.js'
import authenticationToken from '@/functions/Auth/AuthenticationToken.js'
import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  {
    path: "/auth",
    component: () => import("@/layouts/auth-layout.vue"),
    children: [{
      path: "",
      name: "auth",
      meta: {
        authRequired: false,
      },
      component: () => import("@/pages/Auth.vue"),
    }]
    
  },
  {
    path: "/",
    component: () => import("@/layouts/main-layout.vue"),
    children: [
      {
        path: "",
        name: "/",
        meta: {
          authRequired: true,
        },
        component: () => import("@/pages/MyNotes.vue"),
      },
      {
        path: "allNotes",
        name: "allNotes",
        meta: {
          authRequired: true,
          isAdmin: true,
        },
        component: () => import("@/pages/AllNotes.vue"),
      },
      {
        path: "users",
        name: "users",
        meta: {
          authRequired: true,
          isAdmin: true,
        },
        component: () => import("@/pages/Users.vue"),
      }
    ]
  },
  {
    path: "/allNotes",
    component: AllNotes,
    meta: {
      authRequired: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.authRequired)) {
      // этот путь требует авторизации, проверяем залогинен ли
      // пользователь, и если нет, перенаправляем на страницу логина
      if (!(await authenticationToken())) {
        next({
          path: '/auth',
          query: { redirect: to.fullPath }
        })
      } else {
        if (to.matched.some(record => record.meta.isAdmin)) {
          // этот путь требует авторизации, проверяем залогинен ли
          // пользователь, и если нет, перенаправляем на страницу логина
          if (!store.getters['auth/isAdmin']) {
            next({
              path: '/',
              query: { redirect: to.fullPath }
            })
          } else {
            next()
          }
        } else {
          next() // всегда так или иначе нужно вызвать next()!
        }
      }
    } else {
      next() // всегда так или иначе нужно вызвать next()!
    }
    
    
  });

router.afterEach(async (to, from) => {
  // console.log(store);
  // console.log(store.getters['auth/fullName']);
})

export default router
