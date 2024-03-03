import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import UIcomponents from "@/components/UI"


const app = createApp(App);

UIcomponents.forEach(component => {
  app.component(component.name, component);
});



app
  .use(router)
  .use(store)
  .mount('#app')
