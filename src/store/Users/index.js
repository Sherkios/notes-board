import axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    users: {}
  }),
  getters: {
    getUsers(state) {
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
        users.forEach(user => {
          user.isAdmin = (user.gender == 'male');
        });
        // console.log(users);

        commit('setUsers', users)
      } catch (error) {
        
      }
    }
  },
}