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
      store.state.auth.firstName = response.data.firstName
      store.state.auth.lastName = response.data.lastName
      store.state.auth.email = response.data.email
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