import setCookie from "@/functions/Coockies/SetCookie";
import axios from "axios";

export default {
  namespaced: true,
  actions: {
    async authorizate({state, commit}, payload) {
      try {
        const response = await axios.post('https://dummyjson.com/auth/login', payload);

        setCookie("token", response.data.token);
      } catch (error) {
        throw error;
      }
    },
  }
}