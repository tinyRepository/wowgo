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
  setLoading({ commit }, payload) {
    commit(types.SET_LOADING, payload);
  },
  setError({ commit }, payload) {
    commit(types.SET_ERROR, payload);
  },
  clearError({ commit }) {
    commit(types.CLEAR_ERROR);
  }
};

const getters = {
  loading(state) {
    return state.loading;
  },
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
