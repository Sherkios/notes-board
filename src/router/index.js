import Auth from '@/pages/Auth.vue'
import MyNotes from '@/pages/MyNotes.vue'
import AllNotes from '@/pages/AllNotes.vue'
import authenticationToken from '@/functions/AuthenticationToken.js'
import getCookie from '@/functions/Coockies/GetCookie.js'
import { createRouter, createWebHistory } from 'vue-router'

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
        },
        component: () => import("@/pages/AllNotes.vue"),
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
    let token = getCookie('token');
    if (!(await authenticationToken(token))) {
      next({
        path: '/auth',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // всегда так или иначе нужно вызвать next()!
  }
})

export default router
