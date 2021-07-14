import { HTTP } from "../../services/services";
import Vue from "vue";
import { Object } from "core-js";

const state = {
  listAllDrug: [],
  listResultDrug: [],
  listDrugDeleteF: [],
  isBusy: false,
  isLoading: false,
};
const getters = {
  isBusy: (state) => state.isBusy,
  isLoading: (state) => state.isLoading,
  listAllDrug: (state) => {
    return state.listAllDrug;
  },
  listDrugDeleteF: (state) => state.listDrugDeleteF,
  getListDrugID: (state) => (id) => {
    console.log(id);
    const listDrugs = state.listAllDrug.find((group) => {
      console.log(group.id, id);
      return group.id == id;
    });
    console.log(listDrugs);
    return listDrugs.drugs;
  },
  listResultDrug: (state) => state.listResultDrug,
  getResultDrug: (state) => (id) => {
    const drug = state.listResultDrug.find((drug) => drug.id === id);
    return drug;
  },
  listFinalDrug: (state) => {
    const newList = state.listResultDrug.map((item) => ({
      advice: item.advice,
      amount: item.amount,
      detailMRId: item.detailMRId,
      drugId: item.id,
    }));
    return newList;
  },
};

const mutations = {
  listAllDrug: (state, data) => {
    data.forEach((element) => {
      Object.assign(element, { _showDetails: false, loadingRemove: false });
    });
    state.listAllDrug = data;
  },
  listDrugDeleteF: (state, data) => {
    data.forEach((element) => {
      Object.assign(element, { _showDetails: false, loadingRemove: false });
    });
    state.listDrugDeleteF = data;
  },
  listResultDrug: (state, drug) => {
    if (state.listResultDrug.length === 0) {
      state.listResultDrug.push(drug);
    }
    var tong = 0;
    for (let i = 0; i < state.listResultDrug.length; i++) {
      if (state.listResultDrug[i].id == drug.id) {
        tong++;
        break;
      }
    }
    if (tong == 1) console.log("1");
    else {
      state.listResultDrug.push(drug);
    }
  },
  editResultDrug: (state, drug) => {
    const index = state.listResultDrug.findIndex((item) => item.id === drug.id);
    if (index !== -1) state.listResultDrug.splice(index, 1, drug);
  },
  removeDrug: (state, id) => {
    const index = state.listDrugDeleteF.findIndex((item) => item.id === id);
    state.listDrugDeleteF.splice(index, 1);
  },
  removeGroupDrug: (state, id) => {
    const index = state.listAllDrug.findIndex((item) => item.id === id);
    state.listAllDrug.splice(index, 1);
  },
  addGroupDrug(state, data) {
    Object.assign(data, { _showDetails: false, loadingRemove: false });
    state.listAllDrug.unshift(data);
  },
  addDrug(state, data) {
    Object.assign(data, { _showDetails: false, loadingRemove: false });
    state.listDrugDeleteF.unshift(data);
  },
  resetListResultDrug: (state) => {
    state.listResultDrug.splice(0, state.listResultDrug.length);
  },
  setIsBusy(state, isBusy) {
    state.isBusy = isBusy;
  },
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
};

const actions = {
  getListAllDrug({ commit }) {
    commit("setIsBusy", true);
    HTTP.get("drugGroup/listAllDrugG", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((rep) => {
        commit("listAllDrug", rep.data);
        commit("setIsBusy", false);
      })
      .catch((err) => {
        commit("setIsBusy", false);
      });
  },
  getListDrugDeleteF({ commit }) {
    commit("setIsBusy", true);
    HTTP.get("drug/listAllByEnable", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((rep) => {
        commit("listDrugDeleteF", rep.data);
        commit("setIsBusy", false);
      })
      .catch((err) => {
        console.log(err);
        commit("setIsBusy", false);
      });
  },
  createPrescription({ getters, dispatch, commit }, payload) {
    const data = getters.listFinalDrug;
    HTTP.post(
      "prescription/createPrescription",
      {
        listPresciption: data,
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
        if (response.data.message == "There are no drug in the request list!")
          alert("There are no drug in the request list!");
        else alert("Create prescription success");
        commit("setIsLoading", true);
        Vue.nextTick(() => {
          commit("setIsLoading", false);
        });
        dispatch("recordContent/getListRecordDetails", {}, { root: true });
      })
      .catch((err) => {
        alert("Create prescription fail");
        commit(
          "recordContent/setIsLoadingPrescription",
          {
            isLoadingRecord: false,
            prescription: payload.prescription,
          },
          { root: true }
        );
        commit("setIsLoading", true);
        Vue.nextTick(() => {
          commit("setIsLoading", false);
        });
      });
  },
  createDrugs({ dispatch, commit }, payload) {
    commit("setIsLoading", true);
    HTTP.post(
      "drug/createDrug",
      {
        description: payload.description,
        drugContent: payload.drugContent,
        drugGroupId: payload.drugGroupId,
        ingredient: payload.ingredient,
        name: payload.name,
        unit: payload.unit,
      },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((response) => {
        commit("setIsLoading", false);
        alert("Create success");
        commit("addDrug", response.data);
      })
      .catch((err) => {
        commit("setIsLoading", false);
        alert("Create fail");
      });
  },
  createGroupsDrugs({ dispatch, commit }, payload) {
    commit("setIsLoading", true);
    HTTP.post(
      "drugGroup/createDrugGroup",
      {
        name: payload.name,
      },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((response) => {
        commit("setIsLoading", false);
        commit("addGroupDrug", response.data);
        console.log(response);
        alert("Create success");
      })
      .catch((err) => {
        commit("setIsLoading", false);
        alert("Create fail");
      });
  },
  removeGroupDrugs({ dispatch, commit }, payload) {
    HTTP.put(
      `drugGroup/changeStatusIsDelete/${payload.id}`,
      {},
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((response) => {
        Object.assign(payload.data, { loadingRemove: false });
        commit("removeGroupDrug", payload.id);
      })
      .catch((err) => {
        Object.assign(payload.data, { loadingRemove: false });
        alert("Remove fail");
      });
  },
  removeDrugs({ commit }, payload) {
    HTTP.put(
      `drug/changeStatusIsDelete/${payload.id}`,
      {},
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((response) => {
        Object.assign(payload.data, { loadingRemove: false });
        commit("removeDrug", payload.id);
      })
      .catch((err) => {
        Object.assign(payload.data, { loadingRemove: false });
        alert("Remove fail");
        console.log(err);
      });
  },
  setGroupDrugs({ dispatch, commit }, payload) {
    HTTP.put(
      "drugGroup/editDrugGroup",
      {
        id: payload.id,
        name: payload.name,
      },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((response) => {
        dispatch("getListAllDrug");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  setDrugs({ dispatch, commit }, payload) {
    HTTP.put(
      "drug/editDrug",
      {
        description: payload.description,
        drugContent: payload.drugContent,
        drugGroupId: payload.drugGroupId,
        id: payload.id,
        ingredient: payload.ingredient,
        name: payload.name,
        unit: payload.unit,
      },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((response) => {
        dispatch("getListDrugDeleteF");
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

export const drugContent = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
