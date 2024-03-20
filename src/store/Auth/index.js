import router from "@/router";
import axios from "axios";
export default {
  namespaced: true,
  state: () => ({
    firstName: '',
    lastName: '',
    email: '',
    userId: null,
    role: [],
  }),
  mutations: {
    setFirstName(state, firstName) {
      state.firstName = firstName;
    },
    setLastName(state, lastName) {
      state.lastName = lastName;
    },
    setEmail(state, email) {
      state.email = email;
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
    setRole(state, role) {
      if (role.length == 0) {
        state.role = [];
      } else {
        if (!state.role.includes(role)) {
          state.role.push(role)
        }
      }
      
    },
  },
  getters: {
    fullName(state) {
      return state.firstName + " " + state.lastName;
    },
    shortName(state) {
      return state.firstName.slice(0,1) + state.lastName.slice(0,1);
    },
    isAdmin(state) {
      return state.role.includes('admin');
    },
    currentUserId(state) {
      return state.userId;
    }
  },
  actions: {
    async authorizate({state, commit}, payload) {
      try {
        const response = await axios.post('http://localhost:5000/api/users/login', payload, {
          withCredentials: true,
        });
        commit("setFirstName", response.data.firstName);
        commit("setLastName", response.data.lastName);
        commit("setEmail", response.data.email);
        commit("setUserId", response.data.id);
        response.data.roles.forEach(role => {
          commit("setRole", role);
        });
        return response;
      } catch (error) {
        console.warn('Ошибка при авторизации',error)
        // throw error;
        if (error.response.data.message) {
          return error.response
        }
      }
    },

    async logOut({state, commit}) {
      const response = await axios.get('http://localhost:5000/api/users/logout', {
          withCredentials: true,
        });
      router.push('/auth');
      commit("setFirstName", '');
      commit("setLastName", '');
      commit("setEmail", '');
      commit("setUserId", '');
      commit("setRole", []);
    },
  }
}