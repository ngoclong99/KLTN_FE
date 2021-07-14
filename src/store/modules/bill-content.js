import { HTTP } from "../../services/services";
import Vue from "vue";

const state = {
  ListRecordService: [],
  ListService: [],
  isBusy: false,
  isLoading: false,
  ListPayBill: [],
  ListUnPayBill: [],
};
const getters = {
  ListRecordService: (state) => state.ListRecordService,
  ListService: (state) => state.ListService,
  ListPayBill: (state) => state.ListPayBill,
  ListUnPayBill: (state) => state.ListUnPayBill,
  isBusy: (state) => state.isBusy,
  isLoading: (state) => state.isLoading,
  getRecordService: (state) => {
    return state.ListRecordService.filter((item) => {
      return item.detailMRs[0].detailServiceUsed.length > 0;
    });
  },
};

const mutations = {
  ListRecordService: (state, data) => {
    data.forEach((element) => {
      Object.assign(element, { _showDetails: false, loadingBill: false });
    });
    state.ListRecordService = data;
  },
  LoadingBill: (state, payload) => {
    const index = state.ListRecordService.findIndex(
      (item) => item.id == payload.bill.id
    );
    if (index !== -1) state.ListRecordService.splice(index, 1, payload.bill);
  },
  ListService(state, data) {
    state.ListService = data;
  },
  ListPayBill(state, data) {
    data.forEach((element) => {
      Object.assign(element, { _showDetails: false });
    });
    state.ListPayBill = data;
  },
  ListUnPayBill(state, data) {
    data.forEach((element) => {
      Object.assign(element, {
        _showDetails: false,
        loadingRemove: false,
        loadingStatus: false,
      });
    });
    state.ListUnPayBill = data;
  },
  removeUnPayBill(state, id) {
    const index = state.ListUnPayBill.findIndex((item) => item.billId == id);
    if (index !== -1) state.ListUnPayBill.splice(index, 1);
  },
  AddUnPayBill(state, data) {
    Object.assign(data, {
      _showDetails: false,
      loadingRemove: false,
      loadingStatus: false,
    });
    state.ListUnPayBill.unshift(data);
  },
  removePayBill: (state, id) => {
    const index = state.ListPayBill.findIndex((item) => item.id === id);
    state.ListPayBill.splice(index, 1);
  },

  setIsBusy(state, isBusy) {
    state.isBusy = isBusy;
  },
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
};

const actions = {
  getListRecordService({ commit }) {
    commit("setIsBusy", true);
    HTTP.get("medicalrecord/listMR", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((response) => {
        commit("setIsBusy", false);
        commit("ListRecordService", response.data);
      })
      .catch((err) => {
        commit("setIsBusy", false);
      });
  },
  getListService({ commit }) {
    commit("setIsBusy", true);
    HTTP.get("services", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((response) => {
        commit("setIsBusy", false);
        commit("ListService", response.data);
      })
      .catch((err) => {
        commit("setIsBusy", false);
      });
  },
  getPayBill({ commit }) {
    commit("setIsBusy", true);
    HTTP.get("bill/listAllPayByEnable", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((response) => {
        commit("ListPayBill", response.data);
        commit("setIsBusy", false);
      })
      .catch((err) => {
        commit("setIsBusy", false);
      });
  },
  getUnPayBill({ commit }) {
    commit("setIsBusy", true);
    HTTP.get("bill/listAllUnPayByEnable", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((response) => {
        commit("setIsBusy", false);
        commit("ListUnPayBill", response.data);
      })
      .catch((err) => {
        commit("setIsBusy", false);
      });
  },
  createBill({ dispatch, commit }, payload) {
    Object.assign(payload.bill, { loadingBill: true });
    let router = payload.router;
    HTTP.post(
      "bill/createBill",
      {
        healthInsurance: payload.healthInsurance,
        listServiceUsed: payload.listServiceUsed,
        medicalRecordId: payload.medicalRecordId,
        patientId: payload.patientId,
        statusPayment: false,
      },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((response) => {
        Object.assign(payload.bill, { loadingBill: false });
        alert("Create success");
        Vue.nextTick(() => {
          router.push({
            name: "UnPay",
          });
        });
        commit("AddUnPayBill", response.data.billCustomEntity);
      })
      .catch((err) => {
        Object.assign(payload.bill, { loadingBill: false });
        alert("Create fail");
      });
  },
  statusBill({ commit, dispatch }, payload) {
    let router = payload.router;
    HTTP.put(
      `bill/changeStatusPayment/${payload.id}`,
      {},
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((rep) => {
        commit("removePayBill", payload.id);
        dispatch("getUnPayBill");
        router.push({
          name: "UnPay",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  unStatusUnBill({ commit, dispatch }, payload) {
    let router = payload.router;
    HTTP.put(
      `bill/changeStatusPayment/${payload.id}`,
      {},
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((rep) => {
        commit("removeUnPayBill", payload.id);
        dispatch("getPayBill");
        router.push({
          name: "Pay",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  removeBill({ commit, dispatch }, payload) {
    HTTP.put(
      `bill/changeStatusIsDelete/${payload.id}`,
      {},
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((rep) => {
        commit("removeUnPayBill", payload.id);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

export const billContent = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
