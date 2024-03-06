import axios from "axios";

export default {
  methods: {
    async getUserById(id) {
      try {
        let response;
        response = await axios.get(`https://dummyjson.com/users/${id}`);     
        return response.data;
      } catch (error) {
        console.warn(error)
        return null;
      }
    }
  }
}