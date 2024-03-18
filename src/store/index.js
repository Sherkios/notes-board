import { createStore } from 'vuex'
import Auth from '@/store/Auth'
import Users from '@/store/Users'
import Notes from '@/store/Notes'
import Errors from '@/store/Errors'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: Auth,
    users: Users,
    notes: Notes,
    errors: Errors
  }
})
