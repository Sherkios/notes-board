import router from "@/router";
import axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    errorMessage: "",
  }),
  mutations: {
    setErrorMessage(state, message){
      state.errorMessage = message;
    }
  },
  getters: {
    getErrorMessage(state) {
      return state.errorMessage;
    }
  },
  actions: {
    
  }
}