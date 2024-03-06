import axios from "axios";

export default {
  methods: {
    async deletePost(posts, id) {
      try {
        let resultPosts = [];
        const response = await axios.get(`https://dummyjson.com/posts/${id}`, {
          method: 'DELETE',
        });
        resultPosts = posts.filter(post => post.id != id);
        return resultPosts;
      } catch (error) {
        console.warn(error)
        return null;
      }
    }
  }
}