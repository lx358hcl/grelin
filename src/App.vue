<template>
  <div v-if = "!ready" class = "d-flex align-items-center justify-content-center vh-100 vw-100">
    <Spinner style = "font-size:30px;"></Spinner>
  </div>
  <div v-if = "ready">
    <Nav></Nav>
    <router-view class="router-view"></router-view>
    <ScrollToTop></ScrollToTop>
  </div>
</template>

<script>
  import Nav from "./components/Nav.vue";
  import ScrollToTop from "./components/ScrollToTop.vue";
  import firebaseApp from "@/firebase/firebaseconfig.js";
  import settings from "@/settings.js";
  import Spinner from "./components/Spinner.vue";
  import { ref } from "vue";

  var ready = ref(false);

  //Get info before page-load
  async function startup(){
    
    var db = await firebaseApp.firestore();
    var user = await firebaseApp.auth().currentUser;
    var data = await db.collection("websiteinfo").doc("info").get();
    settings.value.websiteinfo = data.data();

    if(user != null){
      var userdata = await db.collection("users").doc(user.uid).get();
      settings.value.user = user.uid;
      settings.value.userData = userdata.data();
      ready.value = true;
    }
    else ready.value = true;
  }

  export default {
    name: 'App',
    components: {
      Nav,
      ScrollToTop,
      Spinner,
    },
    mounted(){
      this.$nextTick(async function () {
        window.scrollTo(0, 0)
      })
    },
    updated() {
      this.$nextTick(function () {
        window.scrollTo(0, 0)
      })
    },
    watch:{
      async $route (){
        window.scrollTo(0, 0)
      },
    },
    setup(){
      startup();
      return{
        ready
      }
    }
  }
</script>