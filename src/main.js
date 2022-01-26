import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js';
import VueGtag from "vue-gtag-next";
import firebaseApp from "@/firebase/firebaseconfig.js";

firebaseApp.auth().onAuthStateChanged(() => {
  createApp(App).use(router, VueGtag, {
    property: {
      id: "UA-212580065-1"
    }
  }).mount('#app');
});

export default router;