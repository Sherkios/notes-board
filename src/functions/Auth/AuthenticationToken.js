import store from "@/store";
import axios from "axios";
export default async function authenticationToken(token) {
  if (token !== undefined) {
    try {
      let response = await axios.get("https://dummyjson.com/auth/me", {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
    });

    if (response.status == 200) {
      store.commit('auth/setFirstName', response.data.firstName);
      store.commit('auth/setLastName', response.data.lastName);
      store.commit('auth/setEmail', response.data.email);
      store.commit('auth/setUserId', response.data.id);
      store.commit('auth/setGender', response.data.gender);
      return true
    }
    } catch (error) {
      if (error.response) {
        // Запрос был сделан, и сервер ответил кодом состояния, который
        // выходит за пределы 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // Запрос был сделан, но ответ не получен
        // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
        // http.ClientRequest в node.js
        console.log(error.request);
      } else {
        // Произошло что-то при настройке запроса, вызвавшее ошибку
        console.log('Error', error.message);
      }
    }
    
  } else {
    return false
  }
}