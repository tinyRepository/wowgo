import firebase from "firebase/app";
import * as types from "../mutation-types";

const state = {
  listData: null
};

const getters = {};

const actions = {
  async addItemToList({ commit, dispatch }, dataForSending) {
    commit(`common/${types.SET_LOADING}`, true, { root: true });
    return await firebase
      .database()
      .ref("black-list")
      .push(dataForSending)
      .then(() => {
        dispatch("loadBlackList");
        setTimeout(() => {
          alert("Успешно добавлен!");
        }, 300);
      })
      .catch(() => {
        alert("Ошибка!");
      })
      .finally(() => {
        commit(`common/${types.SET_LOADING}`, false, { root: true });
      });
  },
  async loadBlackList({ commit }) {
    return await firebase
      .database()
      .ref("black-list")
      .once("value")
      .then(snapshot => {
        commit(types.SET_BLACK_LIST, Object.values(snapshot.val()));
      });
  }
};

const mutations = {
  [types.SET_BLACK_LIST](s, payload) {
    s.listData = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
