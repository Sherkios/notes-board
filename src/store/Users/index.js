import axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    users: {}
  }),
  getters: {
    getUsers(state) {
      for (const key in state.users) {
        let user = state.users[key];
        user.isAdmin = (user.gender == 'male');

        if (user.isAdmin) {
          user.optionsStatus = {
            current: "Активированный",
            currentClass: "blue",
            option: [
              {
                value: "Активированный",
                class: "blue"
              },
              {
                value: "Деактивирован",
                class: "red",
              },
             
            ]
          }
        } else {
          user.optionsStatus = {
            current: "Деактивирован",
            currentClass: "red",
            option: [
              {
                value: "Активированный",
                class: "blue"
              },
              {
                value: "Деактивирован",
                class: "red",
              },
             
            ]
          }
        }

      }
      return state.users;
    }
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    }
  },
  actions: {
    async loadUsers({state, commit}) {
      try {
        const response = await axios('https://dummyjson.com/users');
        let users = response.data.users;
        commit('setUsers', users)
      } catch (error) {
        
      }
    }
  },
}