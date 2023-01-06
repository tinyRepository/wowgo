import firebase from "firebase/compat/app";
import * as types from "../mutation-types";

const state = {
  listData: []
};

const getters = {};

const actions = {
  async addItemToList({ commit, dispatch }, dataForSending) {
    return await firebase
      .database()
      .ref("black-list")
      .push(dataForSending)
      .then(() => {
        dispatch("loadBlackList");
      })
      .catch(() => {
        alert("Ошибка!");
      });
  },

  async loadBlackList({ commit }) {
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
