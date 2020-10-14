// import router from "@/router";
import firebase from "firebase/app";

// initial state
const state = {
  user: null
};

// getters
const getters = {};

// actions
const actions = {
  registerUser({ email, password }) {
    firebase.auth().createUserWithEmailAndPassword(email, password);
  },
  loginUser({ email, password }) {
    firebase.auth().signInWithEmailAndPassword(email, password);
  },
  logoutUser() {
    firebase.auth().signOut();
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
