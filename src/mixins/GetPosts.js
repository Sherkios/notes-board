import axios from "axios";

export default {
  methods: {
    async getPosts(id = 'all') {
      try {
        let response;
        let resultPosts = [];     
        if (id != null) {
          response = await axios.get(`https://dummyjson.com/posts/user/${id}`);     
        } else {
          response = await axios.get(`https://dummyjson.com/posts`);          
        }
        let posts = response.data.posts;
        posts.forEach(post => {
          resultPosts.push(post);
        })
        return resultPosts;
      } catch (error) {
        console.warn(error)
        return null;
      }
    }
  }
}