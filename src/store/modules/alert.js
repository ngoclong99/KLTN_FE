const state = {
    message: "",
    type: ""
};

const getters = {
    message: (state) => state.message,
    type: (state) => state.type,
};

const mutations = {
    setMessageSuccess(state, message) {
        state.type = 'alert-success';
        state.message = message;
    },
    setMessageError(state, message) {
        state.type = 'alert-danger';
        state.message = message;
    },
    clearMessage(state) {
        state.type = '';
        state.message = '';
    }
};

const actions = {
}

export const alert = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
