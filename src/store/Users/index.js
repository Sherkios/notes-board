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
    setUsers(state, users) {
      state.users = users;
    },
    setIdUser(state, id, user) {
      for (const key in state.users) {
        if (state.users[key].id == id) {
          state.users[key] = user;
        }
      }
    }
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
    async loadUsers({state, commit}) {
      try {
        const response = await axios('https://dummyjson.com/users');
        let users = response.data.users;
        commit('setUsers', users)
      } catch (error) {
        
      }
    },

    async upadateUsers({state, commit}, userData) {
      try {
        console.log(userData);
        let response;
        console.log("Обновляем пользователя")
        if (userData.id != null) {
          let user = state.users.filter(user => user.id == userData.id)[0];
          response = await axios(`https://dummyjson.com/users/${userData.id}`, {
            method: 'PUT',
            body: JSON.stringify({
              userData
            }),
          })
          let users = [...state.users];
          users = users.map(user => {
            if (user.id == userData.id) {
              user = userData;
              console.log(user);
            }
            return user;
          })


          commit('setUsers', users);
        } else {
          for (const key in state.users) {
            let user = state.users[key];

            response = await axios(`https://dummyjson.com/users/${user.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({  
                isAdmin: user.isAdmin,
                optionsStatus: user.optionsStatus,
                optionsRole: user.optionsRole,
              }),
            })
          }
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
        const response = await axios('https://dummyjson.com/users/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user
          })
        })
        let users = [...state.users];
        user.id = Date.now();
        users.push(user);
        commit('setUsers', users);
      } catch (error) {
        
      }
    }
  },
}