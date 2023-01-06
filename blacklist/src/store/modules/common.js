import * as types from "../mutation-types";

const state = {
  spinnerRequests: 0,
  error: null
};

const mutations = {
  [types.INCREMENT_SPINNER_REQUESTS]: state => state.spinnerRequests++,
  [types.DECREMENT_SPINNER_REQUESTS]: state => {
    if (state.spinnerRequests) {
      state.spinnerRequests--;
    }
  },
  [types.SET_ERROR](state, payload) {
    state.error = payload;
  },
  [types.CLEAR_ERROR](state) {
    state.error = null;
  }
};

const actions = {
  showSpinnerForRequest({ commit }, promise) {
    commit(types.INCREMENT_SPINNER_REQUESTS);
    return promise.finally(() => {
      commit(types.DECREMENT_SPINNER_REQUESTS);
    });
  },
  setError({ commit }, payload) {
    commit(types.SET_ERROR, payload);
  },
  clearError({ commit }) {
    commit(types.CLEAR_ERROR);
  }
};

const getters = {
  showSpinner: state => !!state.spinnerRequests,
  error(state) {
    return state.error;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
