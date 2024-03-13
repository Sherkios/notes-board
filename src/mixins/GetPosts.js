import axios from "axios";

export default {
  methods: {
    async getPosts(id = null) {
      try {
        let response;
        let resultPosts = [];     
        if (id != null) {
          console.log(id);
          response = await axios.get(`http://localhost:5000/api/notes/user/${id}`);     
        } else {
          response = await axios.get(`http://localhost:5000/api/notes/user`);          
        }
        console.log(response);
        let posts = response.data.posts;
        posts.forEach(post => {
          resultPosts.push(post);
        })
        return resultPosts;
      } catch (error) {
        console.warn(error)
        return {};
      }
    }
  }
}