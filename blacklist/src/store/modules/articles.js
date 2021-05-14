import firebase from "firebase/app";
import * as types from "../mutation-types";

const state = {
  articles: [],
  sections: []
};

const getters = {};

const actions = {
  async addArticle({ dispatch }, dataForSending) {
    return await firebase
      .database()
      .ref("articles")
      .push(dataForSending)
      .then(() => {
        dispatch("loadArticles");
      })
      .catch(() => {
        alert("Ошибка!");
      });
  },

  async loadSections({ commit }) {
    return await firebase
      .database()
      .ref("sections")
      .once("value")
      .then(snapshot => {
        commit(types.SET_SECTIONS, Object.values(snapshot.val()));
      });
  },

  async deleteArticle(key) {
    return await firebase
      .database()
      .ref("articles")
      .child(key)
      .remove();
  },

  async loadArticles({ commit, dispatch }) {
    commit(`common/${types.SET_LOADING}`, true, { root: true });

    return await firebase
      .database()
      .ref("articles")
      .once("value")
      .then(snapshot => {
        const articles = [];
        const values = snapshot.val();

        for (let key in values) {
          if (values[key]) {
            let innerObj = {};
            innerObj = values[key];
            innerObj.id = key;
            articles.push(innerObj);
          }
        }
        dispatch("loadSections");
        commit(types.SET_ARTICLES, articles);
      })
      .finally(() => {
        commit(`common/${types.SET_LOADING}`, false, { root: true });
      });
  }
};

const mutations = {
  [types.SET_ARTICLES](s, payload) {
    s.articles = payload;
  },
  [types.SET_SECTIONS](s, payload) {
    s.sections = payload;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
