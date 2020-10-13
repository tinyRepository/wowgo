import Vue from "vue";
import "normalize.css";
import "@/styles/common.scss";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// Declare uikit globally
import ButtonEl from "Uikit/ButtonEl";
import InputEl from "Uikit/InputEl";

Vue.config.productionTip = false;

Vue.component("button-el", ButtonEl);
Vue.component("input-el", InputEl);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
