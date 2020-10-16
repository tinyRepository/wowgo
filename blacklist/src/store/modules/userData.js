import router from "@/router";
import firebase from "firebase/app";
import * as types from "../mutation-types";

import User from "../user_help";

// initial state
const state = {
  user: null,
  userInfo: null
};

// getters
const getters = {
  // Return user (for get id)
  user(state) {
    return state.user;
  },
  // Check User (for logged)
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

// actions
const actions = {
  // Registration page
  async registerUser(
    { commit },
    { email, password, name, surname, middleName, nameOfObject, address, phone }
  ) {
    commit(`common/${types.CLEAR_ERROR}`, { root: true });
    commit(`common/${types.SET_LOADING}`, true, { root: true });
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
      commit(types.SET_USER, new User(user.user.uid));

      commit(`common/${types.SET_LOADING}`, false, { root: true });
    } catch (error) {
      commit(`common/${types.SET_LOADING}`, false, { root: true });
      commit(`common/${types.SET_ERROR}`, error.message, { root: true });
      throw error;
    }
  },
  // Login page
  async loginUser({ commit }, { email, password }) {
    commit(`common/${types.CLEAR_ERROR}`, { root: true });
    commit(`common/${types.SET_LOADING}`, true, { root: true });
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      commit(types.SET_USER, new User(user.user.uid));
      commit(`common/${types.SET_LOADING}`, false, { root: true });
    } catch (error) {
      commit(`common/${types.SET_LOADING}`, false, { root: true });
      commit(`common/${types.SET_ERROR}`, error.message, { root: true });
      throw error;
    }
  },
  // Get additional user info
  async getUserInfo({ commit }, userId) {
    const user = await firebase
      .database()
      .ref(`users/${userId}`)
      .once("value");
    commit(types.SET_USER_INFO, user.val());
    router.push("/black-list");
  },
  // Logged
  loggedUser({ commit }, payload) {
    // Send mutation new uid used helped Class
    commit(types.SET_USER, new User(payload.uid));
  },
  // Logout
  logoutUser({ commit }) {
    firebase.auth().signOut();
    // Send mutation null
    commit(types.SET_USER, null);
    commit(types.SET_USER_INFO, null);
    router.push("/login");
  }
};

// mutations
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
