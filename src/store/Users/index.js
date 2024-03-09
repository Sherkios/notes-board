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
    }
  },
  actions: {
    async loadUsers({state, commit}) {
      try {
        const response = await axios('https://dummyjson.com/users');
        let users = response.data.users;
        commit('setUsers', users)
      } catch (error) {
        
      }
    },

    async upadateUsers({state, commit}, id = null) {
      try {
        let response;
        console.log("Обновляем пользователя")
        if (id != null) {
          let user = state.users.filter(user => user.id == id)[0];
          response = await axios(`https://dummyjson.com/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
              isAdmin: user.isAdmin,
              optionsStatus: user.optionsStatus,
              optionsRole: user.optionsRole,
            }),
          })
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
    }
  },
}