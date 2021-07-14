import { HTTP } from "../../services/services";
import Vue from "vue";

const state = {
  ListService: [],
  ListResultService: [],
  ListFinalService: [],
  allListService: [],
  isBusy: false,
  isLoading: false,
  isLoadingCreateService: false,
};

const getters = {
  isBusy: (state) => state.isBusy,
  isLoading: (state) => state.isLoading,
  isLoadingCreateService: (state) => state.isLoadingCreateService,
  ListService: (state) => state.ListService,
  ListResultService: (state) => state.ListResultService,
  allListService: (state) => state.allListService,
  getResultService: (state) => (id) => {
    const service = state.ListResultService.find((item) => item.id === id);
    return service;
  },
  getService: (state) => (id) => {
    const services = state.allListService.find((service) => service.id === id);
    return services;
  },
  ListFinalService: (state) => {
    const newList = state.ListResultService.map((item) => ({
      description: item.description,
      detailMRId: item.detailMRId,
      imageXRay: item.imageXRay,
      serviceId: item.id,
    }));
    return newList;
  },
};

const mutations = {
  setIsBusy(state, isBusy) {
    state.isBusy = isBusy;
  },
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
  setIsLoadingCreateService(state, isLoadingCreateService) {
    state.isLoadingCreateService = isLoadingCreateService;
  },
  ListService: (state, data) => {
    state.ListService = data;
  },
  allListService: (state, data) => {
    data.forEach((element) => {
      Object.assign(element, { _showDetails: false });
    });
    state.allListService = data;
  },
  addService: (state, service) => {
    Object.assign(service, { _showDetails: false });
    state.allListService.unshift(service);
  },
  ListResultService: (state, data) => {
    if (state.ListResultService.length === 0) {
      state.ListResultService.push(data);
    }
    var tong = 0;
    for (let i = 0; i < state.ListResultService.length; i++) {
      if (state.ListResultService[i].id == data.id) {
        tong++;
        break;
      }
    }
    if (tong == 1) console.log("1");
    else {
      state.ListResultService.push(data);
    }
  },
  resetListResultService: (state) => {
    state.ListResultService.splice(0, state.ListResultService.length);
  },
  editResultService: (state, service) => {
    const index = state.ListResultService.findIndex(
      (item) => item.id === service.id
    );
    if (index !== -1) state.ListResultService.splice(index, 1, service);
  },
  changeStatusService: (state, service) => {
    const index = state.allListService.findIndex(
      (item) => item.id == service.id
    );
    if (index !== -1) state.allListService.splice(index, 1, service);
  },
  changeServiceDetails: (state, payload) => {
    const index = state.allListService.findIndex(
      (item) => item.id === payload.service.id
    );
    Object.assign(payload.service, {
      name: payload.name,
      fees: payload.fees,
    });
    if (index !== -1) state.allListService.splice(index, 1, payload.service);
  },
};

const actions = {
  getAllListService({ commit }) {
    commit("setIsBusy", true);
    HTTP.get("services", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((rep) => {
        commit("allListService", rep.data);
        commit("setIsBusy", false);
      })
      .catch((err) => {
        commit("setIsBusy", false);
        console.log(err);
      });
  },
  // Con hoat Dong
  getListService({ commit }) {
    HTTP.get("services/findByStatusTrue", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((rep) => {
        commit("ListService", rep.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  createService({ dispatch, commit }, payload) {
    HTTP.post(
      "services/createServices",
      {
        fees: payload.fees,
        name: payload.name,
      },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((response) => {
        commit("setIsLoadingCreateService", false);
        commit("addService", response.data);
        alert("Create service success");
      })
      .catch((err) => {
        commit("setIsLoadingCreateService", false);
        alert("Create service fail");
      });
  },
  createPayService({ dispatch, commit }, payload) {
    HTTP.post(
      "detailserviceused/createServiceUsed",
      {
        listServiceUsed: payload.data,
      },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((response) => {
        commit(
          "recordContent/setIsLoadingPrescription",
          {
            isLoadingRecord: false,
            prescription: payload.prescription,
          },
          { root: true }
        );
        if (
          response.data.message == "There are no services in the request list!"
        )
          alert("There are no services in the request list!");
        else alert("Create services success");
        commit("setIsLoading", true);
        Vue.nextTick(() => {
          commit("setIsLoading", false);
        });
        dispatch("recordContent/getListRecordDetails", {}, { root: true });
      })
      .catch((err) => {
        commit(
          "recordContent/setIsLoadingPrescription",
          {
            isLoadingRecord: false,
            prescription: payload.prescription,
          },
          { root: true }
        );
        alert("Create services fail");
        commit("setIsLoading", true);
        Vue.nextTick(() => {
          commit("setIsLoading", false);
        });
      });
  },
  setService({ commit }, payload) {
    Object.assign(payload.service, { loadingDetails: true });
    commit("changeServiceDetails", payload);
    HTTP.put(
      "services/editServices",
      {
        fees: payload.fees,
        id: payload.id,
        name: payload.name,
      },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((response) => {
        Object.assign(payload.service, { loadingDetails: false });
        commit("changeServiceDetails", payload);
        alert("Change success");
      })
      .catch((err) => {
        Object.assign(payload.service, { loadingDetails: false });
        commit("changeServiceDetails", payload);
        alert("Change success");
      });
  },
  setStatusService({ commit }, payload) {
    HTTP.put(
      `services/changeStatus/${payload.id}`,
      {},
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((response) => {
        Object.assign(payload.service, { loading: false });
        commit("changeStatusService", payload.service);
        alert("Change status success");
      })
      .catch((err) => {
        Object.assign(payload.news, { loading: false });
        commit("changeStatusService", payload.service);
        alert("Change status fail");
      });
  },
};

export const serviceContent = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
