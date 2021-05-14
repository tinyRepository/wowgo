import firebase from "firebase/app";
import * as types from "../mutation-types";

const state = {
  listData: []
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
      })
      .catch(() => {
        alert("Ошибка!");
      })
      .finally(() => {
        commit(`common/${types.SET_LOADING}`, false, { root: true });
      });
  },

  async loadBlackList({ commit }) {
    commit(`common/${types.SET_LOADING}`, true, { root: true });
    return await firebase
      .database()
      .ref("black-list")
      .once("value")
      .then(snapshot => {
        commit(
          types.SET_BLACK_LIST,
          snapshot.val(),
          Object.keys(snapshot.val())
        );
      })
      .finally(() => {
        commit(`common/${types.SET_LOADING}`, false, { root: true });
      });
  },
  // eslint-disable-next-line
  async deleteUserFromBlackList({ commit, dispatch }, key) {
    return await firebase
      .database()
      .ref("black-list")
      .child(key)
      .remove()
      .then(() => {
        dispatch("loadBlackList");
      });
  }
};

const mutations = {
  [types.SET_BLACK_LIST](s, payload) {
    for (let prop in payload) {
      payload[prop].id = prop;
    }

    s.listData = Object.values(payload);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
