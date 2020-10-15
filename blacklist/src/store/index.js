import Vue from "vue";
import Vuex from "vuex";
import common from "./modules/common";
import userData from "./modules/userData";
import blackList from "./modules/blackList";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
    blackList,
    userData
  }
});
