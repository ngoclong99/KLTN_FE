import moment from "moment";
import Vue from "vue";
import { HTTP } from "../../services/services";

const state = {
  allListNews: [],
  allListNewsTrue: [],
  isBusy: false,
  isLoading: false,
  isShowModalCreate: false,
};
const getters = {
  isBusy: (state) => state.isBusy,
  isShowModalCreate: (state) => state.isShowModalCreate,
  isLoading: (state) => state.isLoading,
  allListNews: (state) => state.allListNews,
  allListNewsTrue: (state) => state.allListNewsTrue,
  getNews: (state) => (id) => {
    const news = state.allListNews.find((news) => news.id === id);
    return news;
  },
};

const mutations = {
  removeItemNews: (state, news) => {
    const index = state.allListNews.findIndex((item) => item.id === news.id);
    if (index !== -1) state.allListNews.splice(index, 1);
  },
  changeStatusNews: (state, news) => {
    const index = state.allListNews.findIndex((item) => item.id === news.id);
    if (index !== -1) state.allListNews.splice(index, 1, news);
  },
  changeNewsDetails: (state, payload) => {
    const index = state.allListNews.findIndex(
      (item) => item.id === payload.news.id
    );
    Object.assign(payload.news, {
      content: payload.content,
      title: payload.title,
      images: payload.images,
    });
    if (index !== -1) state.allListNews.splice(index, 1, payload.news);
  },
  addNews: (state, news) => {
    state.allListNews.unshift(news);
  },
  setAllListNews(state, data) {
    data.forEach((element) => {
      Object.assign(element, {
        _showDetails: false,
        loading: false,
        remove: false,
        loadingDetails: false,
      });
    });
    state.allListNews = data;
  },
  setAllListNewsTrue(state, data) {
    state.allListNewsTrue = data;
  },

  setIsBusy(state, isBusy) {
    state.isBusy = isBusy;
  },
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
  setIsShowModalCreate(state, status) {
    state.isShowModalCreate = status;
  },
};

const actions = {
  getAllNews({ commit }) {
    commit("setIsBusy", true);
    HTTP.get("news", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((response) => {
        commit("setIsBusy", false);
        commit("setAllListNews", response.data);
      })
      .catch((err) => {
        commit("setIsBusy", false);
      });
  },
  getAllNewsTrue({ commit }) {
    HTTP.get("news/findByStatusTrue", {})
      .then((response) => {
        commit("setAllListNewsTrue", response.data);
      })
      .catch((err) => {});
  },
  createNews({ commit }, payload) {
    commit("setIsLoading", true);
    HTTP.post(
      "news/createNews",
      {
        content: payload.content,
        title: payload.title,
        images: payload.images,
      },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((response) => {
        commit("setIsLoading", false);
        commit("addNews", response.data);
        alert("Create news success");
        Vue.nextTick(function() {
          commit("setIsShowModalCreate", false);
        });
      })
      .catch((err) => {
        commit("setIsLoading", false);
        alert("Create news fail");
        Vue.nextTick(function() {
          commit("setIsShowModalCreate", false);
        });
      });
  },
  updateNews({ commit }, payload) {
    Object.assign(payload.news, { loadingDetails: true });
    commit("changeNewsDetails", payload);
    HTTP.put(
      "news/editNews",
      {
        content: payload.content,
        title: payload.title,
        images: payload.images,
        id: payload.id,
      },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((response) => {
        Object.assign(payload.news, { loadingDetails: false });
        commit("changeNewsDetails", payload);
        alert("Change success");
      })
      .catch((err) => {
        Object.assign(payload.news, { loadingDetails: false });
        commit("changeNewsDetails", payload);
        alert("Change fail");
      });
  },
  changeStatus({ commit }, payload) {
    HTTP.put(
      `news/changeStatus/${payload.id}`,
      {},
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((response) => {
        Object.assign(payload.news, { loading: false });
        commit("changeStatusNews", payload.news);
        alert("Change status success");
        // console.log("Change status success");
      })
      .catch((err) => {
        Object.assign(payload.news, { loading: false });
        commit("changeStatusNews", payload.news);
        alert("Change status fail");
      });
  },
  removeNews({ commit }, payload) {
    HTTP.put(
      `news/changeStatusIsDelete/${payload.id}`,
      {},
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((response) => {
        Object.assign(payload.news, { remove: false });
        commit("removeItemNews", payload.news);
        alert("Remove success");
      })
      .catch((err) => {
        Object.assign(payload.news, { remove: false });
        commit("removeItemNews", payload.news);
        alert("Remove fail");
      });
  },
};

export const newsContent = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
