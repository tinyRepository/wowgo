import router from "@/router";
import firebase from "firebase/app";

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
  address,
  surname,
  middleName,
  nameOfObject
) {
  firebase
    .database()
    .ref("users/" + userId)
    .set({
      phone: phone,
      name: name,
      address: address,
      surname: surname,
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
    commit("clearError");
    commit("setLoading", true);
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
      commit("setUser", new User(user.user.uid));

      commit("setLoading", false);
    } catch (error) {
      commit("setLoading", false);
      commit("setError", error.message);
      throw error;
    }
  },
  // Login page
  async loginUser({ commit }, { email, password }) {
    commit("clearError");
    commit("setLoading", true);
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      commit("setUser", new User(user.user.uid));
      commit("setLoading", false);
    } catch (error) {
      commit("setLoading", false);
      commit("setError", error.message);
      throw error;
    }
  },
  // Get additional user info
  async getUserInfo({ commit }, userId) {
    const user = await firebase
      .database()
      .ref(`users/${userId}`)
      .once("value");
    commit("setUserInfo", user.val());
    router.push("/black-list");
  },
  // Logged
  loggedUser({ commit }, payload) {
    // Send mutation new uid used helped Class
    commit("setUser", new User(payload.uid));
  },
  // Logout
  logoutUser({ commit }) {
    firebase.auth().signOut();
    // Send mutation null
    commit("setUser", null);
    router.push("/login");
  }
};

// mutations
const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  setUserInfo(state, payload) {
    state.userInfo = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
