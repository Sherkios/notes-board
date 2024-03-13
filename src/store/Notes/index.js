import router from "@/router";
import axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    posts: {}
  }),
  mutations: {
    setPosts(state, post) {
      state.post = post;
    }
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
        console.log(response);
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

    async deletePost(posts, id) {
      let resultPosts = [];
      try {
        const response = await axios.delete(`https://dummyjson.com/posts/${id}`);
        resultPosts = posts.filter(post => post.id != id);
        return resultPosts;
      } catch (error) {
        if (error.response.status == 404) {
          console.warn("Нет такого id в dummyJson");
          resultPosts = posts.filter(post => post.id != id);
          return resultPosts;
        }
        console.warn(error)
        return null;
      }
    },

    async updatePost(post, id) {
      try {
        const response = await axios.put(`https://dummyjson.com/posts/${id}`, post)
      } catch (error) {
        
      }
    }
  }
}