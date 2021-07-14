import axios from "axios";
import { accessToken } from "../../helper/token_oa"
const state = {
    listResponseSuggestions: [],
    isBusy: false,
    message: "",
    type: "",
    infoZalo: {},
    itemPrev: null,
    listOAFollow: [],
    listAcc: []
};

const getters = {
    listResponseSuggestions: (state) => state.listResponseSuggestions,
    isBusy: (state) => state.isBusy,
    message: (state) => state.message,
    type: (state) => state.type,
    infoZalo: (state) => state.infoZalo,
    itemPrev: (state) => state.itemPrev,
    listOAFollow: (state) => state.listOAFollow,
    listAcc: (state) => state.listAcc
};

const mutations = {
    setListResponseSuggestions(state, data) {
        for (var i = 0; i < data.length; i++) {
            data[i]._showDetails = false;
        }
        return (state.listResponseSuggestions = data);
    },
    deleteResponseSuggestion(state, query) {
        var a = state.listResponseSuggestions;
        for (var i = 0; i < a.length; i++) {
            if (a[i].query === query) {
                a.splice(i, 1);
                break;
            }
        }
        return (state.listResponseSuggestions = a);
    },
    setIsBusy(state, isBusy) {
        return (state.isBusy = isBusy);
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
    },
    setInfoZalo(state, dataInfo) {
        if (dataInfo.user_gender === 1)
            dataInfo.user_gender = "male"
        else dataInfo.user_gender = "female"
        state.infoZalo = dataInfo;
    },
    toggleShowDetail(state, item) {
        item._showDetails = !item._showDetails;
        if (state.itemPrev !== null) {
            if (state.itemPrev !== item) {
                state.itemPrev._showDetails = false
            }
        }
        state.itemPrev = item;
    },
    setListOAFollow(state) {
        var lookupObject = {};
        for (var i in state.listResponseSuggestions) {
            lookupObject[state.listResponseSuggestions[i]["zalo_id"]] = state.listResponseSuggestions[i];
        }
        for (i in lookupObject) {
            state.listOAFollow.push(lookupObject[i]);
        }
        return state.listOAFollow
    },
};

const actions = {
    getListResponseSuggestions({ commit }) {
        commit("setIsBusy", true);
        axios
            .get(
                "https://webhook-chatbot-grand.herokuapp.com/api/answersuggestion"
            )
            .then((response) => {
                commit("setListResponseSuggestions", response.data);
                commit("setIsBusy", false);
                commit("setListOAFollow")
                for (var i = 0; i < state.listOAFollow.length; i++) {
                    axios
                        .get(
                            `https://openapi.zalo.me/v2.0/oa/getprofile?access_token=${accessToken}&data={"user_id":${state.listOAFollow[i].zalo_id}}`
                        )
                        .then((response) => {
                            state.listAcc.unshift(response.data.data);
                        })
                        .catch((error) => {
                            console.log(error.response.data);
                        });
                }
            })
            .catch((error) => {
                commit("setIsBusy", false);
                console.log(error.data.message);
            });
    },
    deleteResponseSuggestion({ commit }, query) {
        axios
            .post(
                "https://webhook-chatbot-grand.herokuapp.com/api/answersuggestion",
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
    updateResponseSuggestion({ commit }, template) {
        axios
            .post(
                "https://webhook-chatbot-grand.herokuapp.com/api/updatesuggestion",
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
                commit('responseTemplate/addResponseTemplates', template, { root: true });
                commit("deleteResponseSuggestion", template.query);
            })
            .catch((error) => {
                commit("setMessageError", error.response.data.message);
                setTimeout(() => {
                    commit("clearMessage");
                }, 3000);
                commit("deleteResponseSuggestion", template.query);
            });

    },
    handleShowInfo({ commit }, item) {
        commit("toggleShowDetail", item)
        axios
            .get(
                `https://openapi.zalo.me/v2.0/oa/getprofile?access_token=${accessToken}&data={"user_id":${item.zalo_id}}`
            )
            .then((response) => {
                commit("setInfoZalo", response.data.data)
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    },
};

export const responseSuggestion = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
