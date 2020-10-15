import Vue from "vue";
import Vuex from "vuex";
import common from "./modules/common";
import userData from "./modules/userData";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
    userData
  }
});
