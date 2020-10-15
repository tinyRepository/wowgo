const state = {
  loading: false,
  error: null
};

const mutations = {
  setLoading(state, payload) {
    state.loading = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
  clearError(state) {
    state.error = null;
  }
};

const actions = {
  // Show loading
  setLoading({ commit }, payload) {
    commit("setLoading", payload);
  },
  // Show error
  setError({ commit }, payload) {
    commit("setError", payload);
  },
  // Clear error
  clearError({ commit }) {
    commit("clearError");
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
