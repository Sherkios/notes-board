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
        console.log(response)
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
        if (userData._id != null) {
          response = await axios.put(`http://localhost:5000/api/users/${userData._id}`, {...userData});
          
        }
        console.log(response);

      } catch (error) {
        console.log(error);
      }
    },

    async deleteUser({state, commit}, id) {
      try {
        const response = await axios(`https://dummyjson.com/users/${id}`, {
          method: 'DELETE',
        });
        let users = state.users.filter(user => user.id != id);
        commit('setUsers', users)
      } catch (error) {
        let users = state.users.filter(user => user.id != id);
        commit('setUsers', users)
        console.warn(error);
      }
    },

    async createUser({state, commit}, user) {
      try {
        let {username, password, firstName, lastName} = user;
        const response = await axios.post('http://localhost:5000/api/users/registration', {username, password, firstName,lastName});
      } catch (error) {
        
      }
    }
  },
}