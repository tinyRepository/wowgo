import Vue from "vue";
import Vuelidate from "vuelidate";
import "normalize.css";
import "@/styles/common.scss";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import smoothscroll from "smoothscroll-polyfill";
import Meta from "vue-meta";
import FloatingVue from "floating-vue";

import "floating-vue/dist/style.css";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/messaging";
import "firebase/compat/storage";

import firebaseConfig from "./firebaseConfig.js";

// Declare uikit globally
import SearchEl from "Common/SearchEl";
import SelectBox from "Uikit/SelectBox";
import BaseInput from "Uikit/BaseInput";
import TheSpinner from "Common/TheSpinner";
import BaseButton from "Uikit/BaseButton";
import TextareaEl from "Uikit/TextareaEl";
import BaseSwitch from "Uikit/BaseSwitch";
import CheckBoxEl from "Uikit/CheckBoxEl";

Vue.config.productionTip = false;

Vue.component("search-el", SearchEl);
Vue.component("select-box", SelectBox);
Vue.component("base-input", BaseInput);
Vue.component("the-spinner", TheSpinner);
Vue.component("base-button", BaseButton);
Vue.component("textarea-el", TextareaEl);
Vue.component("base-switch", BaseSwitch);
Vue.component("checkbox-el", CheckBoxEl);

Vue.prototype.wip = () => alert("Функционал в разработке"); // eslint-disable-line

Vue.use(Vuelidate);
Vue.use(Meta);
Vue.use(FloatingVue);

smoothscroll.polyfill();

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App),

  beforeCreate() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // Check Logged
        store.dispatch("userData/loggedUser", user);
        store.dispatch("userData/getUserInfo", user.uid);
      }
    });
  }
}).$mount("#app");
