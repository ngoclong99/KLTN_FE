import { HTTP } from "../../services";

const state = {
  listStatistical: [],
  listDay: [],
  listValue: [],
};

const getters = {
  listStatistical: (state) => state.listStatistical,
  listValue: (state) => {
    const list = state.listStatistical.map((item) => {
      return (item.value = 10);
    });
    return (state.listValue = list);
  },
  listDay: (state) => {
    const listDay = [];
    for (let index = 1; index <= state.listStatistical.length; index++) {
      listDay.push(index);
    }
    return (state.listDay = listDay);
  },
};

const mutations = {
  listStatistical: (state, data) => {
    state.listStatistical = data;
  },
};

const actions = {
  getListStatistical({ commit }, data) {
    HTTP.get(`bill/findThongke/${data}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((response) => {
        commit("listStatistical", response.data);
      })
      .catch((error) => {
        console.log(error.data.message);
      });
  },
};

export const statisticalContent = {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};
