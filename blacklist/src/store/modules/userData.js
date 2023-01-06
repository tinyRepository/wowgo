import router from "@/router";
import firebase from "firebase/compat/app";
import * as types from "../mutation-types";

import User from "../user_help";

const state = {
  user: null,
  userInfo: null
};

const getters = {
  user(state) {
    return state.user;
  },
  isAdmin(state) {
    return state.userInfo && state.userInfo.admin;
  },
  checkUser(state) {
    return state.user !== null;
  }
};

function writeUserData(
  userId,
  name,
  phone,
  surname,
  address,
  middleName,
  nameOfObject
) {
  firebase
    .database()
    .ref("users/" + userId)
    .set({
      name: name,
      phone: phone,
      surname: surname,
      address: address,
      middleName: middleName,
      nameOfObject: nameOfObject
    });
}

const actions = {
  async registerUser(
    { commit },
    { email, password, name, surname, middleName, nameOfObject, address, phone }
  ) {
    commit(`common/${types.CLEAR_ERROR}`, { root: true });
    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      writeUserData(
        user.user.uid,
        name,
        phone,
        surname,
        address,
        middleName,
        nameOfObject
      );
      commit(types.SET_USER, new User(user.user.uid, name, surname));
      router.push("/black-list"); // TODO redirect to success registration page
    } catch (error) {
      commit(`common/${types.SET_ERROR}`, error.message, { root: true });
      throw error;
    }
  },

  async loginUser({ commit, dispatch }, { email, password }) {
    commit(`common/${types.CLEAR_ERROR}`, { root: true });
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      dispatch("getUserInfo", user.user.uid);
      commit(types.SET_USER, new User(user.user.uid));
      router.push("/black-list");
    } catch (error) {
      commit(`common/${types.SET_ERROR}`, error.message, { root: true });
      throw error;
    }
  },
  async getUserInfo({ commit }, userId) {
    const user = await firebase
      .database()
      .ref(`users/${userId}`)
      .once("value");
    commit(types.SET_USER_INFO, user.val());
  },
  loggedUser({ commit }, payload) {
    localStorage.setItem("authUser", payload.uid);
    commit(types.SET_USER, new User(payload.uid));
  },
  logoutUser({ commit }) {
    firebase.auth().signOut();
    // Send mutation null
    localStorage.removeItem("authUser");
    commit(types.SET_USER, null);
    commit(types.SET_USER_INFO, null);
    router.push("/login");
  }
};

const mutations = {
  [types.SET_USER](s, payload) {
    s.user = payload;
  },
  [types.SET_USER_INFO](s, payload) {
    s.userInfo = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
