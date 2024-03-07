import axios from "axios";

export default {
  methods: {
    async deletePost(posts, id) {
      let resultPosts = [];
      try {
        const response = await axios.get(`https://dummyjson.com/posts/${id}`, {
          method: 'DELETE',
        });
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
    }
  }
}