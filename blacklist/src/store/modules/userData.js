import { checkSessionToken, removeSessionToken } from "@/utils/helpers";
import router from "@/router";
import * as types from "../mutation-types";

// initial state
const state = {
  loginInfo: null
};

// getters
const getters = {};

// actions
const actions = {
  checkUserAuthSession({ commit, state }) {// eslint-disable-line
    const loginInfo = checkSessionToken();
    const newToken = loginInfo && loginInfo.token;
    const oldToken = state.loginInfo && state.loginInfo.token;
    const loginWasUpdated = newToken !== oldToken;
    if (loginWasUpdated) {
      commit(types.SET_LOGIN_INFO, loginInfo);
    }
  },
  logOut({ commit }) {
    removeSessionToken();
    router.push("/");
    commit(types.REMOVE_LOGIN_INFO);
  }
};

// mutations
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
