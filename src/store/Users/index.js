import axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    users: {}
  }),
  getters: {
    getUsers(state) {
      for (const key in state.users) {
        let user = state.users[key];
        user.isAdmin = (user.gender == 'male');

        if (user.isAdmin) {
          user.optionsStatus = {
            current: "Активированный",
            currentClass: "blue",
            option: [
              {
                value: "Активированный",
                class: "blue"
              },
              {
                value: "Деактивирован",
                class: "red",
              },
             
            ]
          }
          user.optionsRole = {
            current: "Администратор",
            currentClass: "blue",
            option: [
              {
                value: "Администратор",
                class: "blue"
              },
              {
                value: "Пользователь",
                class: "green",
              },
             
            ]
          }
        } else {
          user.optionsStatus = {
            current: "Деактивирован",
            currentClass: "red",
            option: [
              {
                value: "Активированный",
                class: "blue"
              },
              {
                value: "Деактивирован",
                class: "red",
              },
             
            ]
          }
          user.optionsRole = {
            current: "Пользователь",
            currentClass: "green",
            option: [
              {
                value: "Администратор",
                class: "blue"
              },
              {
                value: "Пользователь",
                class: "green",
              },
             
            ]
          }
        }

      }
      return state.users;
    }
  },
  mutations: {
  },
  actions: {
    async getUser({state, commit}, id = null) {
      try {
        let response;
        let resultPosts = [];
        if (id != null) {
          response = await axios.get(`http://localhost:5000/api/users/${id}`);     
        } else {
          response = await axios.get(`http://localhost:5000/api/users/`);     
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

    async upadateUsers({state, commit}, userData) {
      try {
        let response;
        console.log(userData);
        if (userData._id != null) {
          response = await axios.put(`http://localhost:5000/api/users/${userData._id}`, {...userData});
          
        }
        return response;
        
      } catch (error) {
        if (error.response.status == 405) {
          return error.response
        }
      }
    },

    async deleteUser({state, commit}, id) {
      try {
        // console.log(id);
        const response = await axios.delete(`http://localhost:5000/api/users/${id}`);
        return response;
      } catch (error) {
        if (error.response) {
          return error.response;
        }
      }
    },

    async createUser({state, commit}, user) {
      try {
        let {username, password, firstName, lastName} = user;
        const response = await axios.post('http://localhost:5000/api/users/registration', {username, password, firstName,lastName});
        return response;
      } catch (error) {
        if (error.response) {
          return error.response;
        }
      }
    }
  },
}