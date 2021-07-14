import axios from "axios";
const state = {
    listResponseTemplates: [],
    isBusy: false,
    message: "",
    type: ""
};

const getters = {
    listResponseTemplates: (state) => state.listResponseTemplates,
    isBusy: (state) => state.isBusy,
    message: (state) => state.message,
    type: (state) => state.type,
};

const mutations = {
    setListResponseTemplates(state, data) {
        return (state.listResponseTemplates = data);
    },
    setIsBusy(state, isBusy) {
        return (state.isBusy = isBusy);
    },
    deleteResponseTemplates(state, query) {
        var a = state.listResponseTemplates;
        for (var i = 0; i < a.length; i++) {
            if (a[i].query === query) {
                a.splice(i, 1);
                break;
            }
        }
        return (state.listResponseTemplates = a);
    },
    addResponseTemplates(state, template) {
        return state.listResponseTemplates.unshift(template);
    },
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
    // ResponseTemplates
    getListResponseTemplates({ commit }) {
        commit("setIsBusy", true);
        axios
            .get(
                "https://webhook-chatbot-grand.herokuapp.com/api/message"
            )
            .then((response) => {
                commit("setListResponseTemplates", response.data);
                commit("setIsBusy", false);
            })
            .catch((error) => {
                commit("setIsBusy", false);
                console.log(error.data.message);
            });
    },
    deleteResponseTemplate({ commit }, query) {
        axios
            .post(
                "https://webhook-chatbot-grand.herokuapp.com/api/deleteMessage",
                { query: query }
            )
            .then((response) => {
                commit("setMessageSuccess", response.data.message);
                setTimeout(() => {
                    commit("clearMessage");
                }, 3000);
                commit("deleteResponseTemplates", query);
            })
            .catch((error) => {
                commit("setMessageError", error.response.data.message);
                setTimeout(() => {
                    commit("clearMessage");
                }, 3000);
            });
    },
    createResponseTemplate({ commit }, template) {
        axios
            .post(
                "https://webhook-chatbot-grand.herokuapp.com/api/message",
                {
                    query: template.query.trim(),
                    answer: template.answer.trim()
                }
            )
            .then((response) => {
                commit("setMessageSuccess", response.data.message);
                setTimeout(() => {
                    commit("clearMessage");
                }, 3000);
                commit("addResponseTemplates", template);

            })
            .catch(() => {
                commit("setMessageError", error.response.data.message);
                setTimeout(() => {
                    commit("clearMessage");
                }, 3000);
            });
    },
};

export const responseTemplate = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
