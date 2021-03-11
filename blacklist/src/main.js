import Vue from "vue";
import Vuelidate from "vuelidate";
import "normalize.css";
import "@/styles/common.scss";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import smoothscroll from "smoothscroll-polyfill";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/messaging";
import "firebase/storage";

// Declare uikit globally
import InputEl from "Uikit/InputEl";
import ButtonEl from "Uikit/ButtonEl";
import SearchEl from "Common/SearchEl";
import SelectBox from "Uikit/SelectBox";
import SpinnerEl from "Common/SpinnerEl";
import TextareaEl from "Uikit/TextareaEl";
import BaseSwitch from "Uikit/BaseSwitch";

Vue.config.productionTip = false;

Vue.component("input-el", InputEl);
Vue.component("search-el", SearchEl);
Vue.component("button-el", ButtonEl);
Vue.component("select-box", SelectBox);
Vue.component("spinner-el", SpinnerEl);
Vue.component("textarea-el", TextareaEl);
Vue.component("base-switch", BaseSwitch);

const VueInputMask = require("vue-inputmask").default;
Vue.prototype.wip = () => alert('Функционал в разработке'); // eslint-disable-line

Vue.use(VueInputMask);
Vue.use(Vuelidate);

smoothscroll.polyfill();

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    var firebaseConfig = {
      apiKey: "AIzaSyD9CaVFgo3YvJ9Nh6pgUMUIXJJ__HE7LnU",
      authDomain: "black-list-5cf3a.firebaseapp.com",
      databaseURL: "https://black-list-5cf3a.firebaseio.com",
      projectId: "black-list-5cf3a",
      storageBucket: "black-list-5cf3a.appspot.com",
      messagingSenderId: "153762007030",
      appId: "1:153762007030:web:1336071a31d1d2e8d7a9d7",
      measurementId: "G-5NBQ5T5VT5"
    };
    firebase.initializeApp(firebaseConfig);

    // Auth Check
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // Check Logged
        store.dispatch("userData/loggedUser", user);
        store.dispatch("userData/getUserInfo", user.uid);
      }
    });
  }
}).$mount("#app");
