import router from "@/router";
import axios from "axios";

export default {
  namespaced: true,
  state: () => ({
  }),
  mutations: {
  },
  getters: {
  },
  actions: {
    async getPosts({state, commit}, id = null) {
      try {
        let response;
        let resultPosts = [];
        if (id != null) {
          response = await axios.get(`http://localhost:5000/api/notes/user/${id}`);     
        } else {
          response = await axios.get(`http://localhost:5000/api/notes/user`);          
        }
        let posts = response.data;
        posts.forEach(post => {
          resultPosts.push(post);
        })
        return resultPosts;
      } catch (error) {
        console.warn(error)
        return {};
      }
    },

    async deletePost({}, id) {
      let resultPosts = [];
      try {
        const response = await axios.delete(`http://localhost:5000/api/notes/${id}`);
      } catch (error) {
        console.warn(error)
        return null;
      }
    },
    async addPost({state, commit}, post) {
      try {
        const response = await axios.post(`http://localhost:5000/api/notes`, {...post})
        return;
      } catch (error) {
        
      }
    },

    async updatePost(post, id) {
      try {
        const response = await axios.put(`http://localhost:5000/api/notes`, {...post})
      } catch (error) {
        
      }
    }
  }
}