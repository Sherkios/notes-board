import deleteCookie from "@/functions/Coockies/DeletaCookie";
import setCookie from "@/functions/Coockies/SetCookie";
import router from "@/router";
import axios from "axios";
export default {
  namespaced: true,
  state: () => ({
    firstName: '',
    lastName: '',
    email: '',
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
  },
  getters: {
    fullName(state) {
      return state.firstName + " " + state.lastName;
    },
    shortName(state) {
      return state.firstName.slice(0,1) + state.lastName.slice(0,1);
    }
  },
  actions: {
    async authorizate({state, commit}, payload) {
      try {
        const response = await axios.post('https://dummyjson.com/auth/login', payload);

        setCookie("token", response.data.token);
        commit("setFirstName", response.data.firstName);
        commit("setLastName", response.data.lastName);
        commit("setEmail", response.data.email);
      } catch (error) {
        throw error;
      }
    },
    logOut({state, commit}) {
      router.push('/auth');
      deleteCookie("token");
      commit("setFirstName", '');
      commit("setLastName", '');
      commit("setEmail", '');
    }
  }
}