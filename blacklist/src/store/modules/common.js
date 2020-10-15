import * as types from "../mutation-types";

const state = {
  loading: false,
  error: null
};

const mutations = {
  [types.SET_LOADING](state, payload) {
    state.loading = payload;
  },
  [types.SET_ERROR](state, payload) {
    state.error = payload;
  },
  [types.CLEAR_ERROR](state) {
    state.error = null;
  }
};

const actions = {
  // Show loading
  setLoading({ commit }, payload) {
    commit(types.SET_LOADING, payload);
  },
  // Show error
  setError({ commit }, payload) {
    commit(types.SET_ERROR, payload);
  },
  // Clear error
  clearError({ commit }) {
    commit(types.CLEAR_ERROR);
  }
};

const getters = {
  // Get load status
  loading(state) {
    return state.loading;
  },
  // Get error message
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
