import { HTTP } from "../../services/services";

const state = {
  listPatientContent: [],
  isBusy: false,
};

const getters = {
  listPatient: (state) => state.listPatientContent,
  isBusy: (state) => state.isBusy,
};

const mutations = {
  setListPatient(state, data) {
    data.forEach((element) => {
      Object.assign(element, { isLoadingCreate: false });
    });
    return (state.listPatientContent = data);
  },
  setIsBusy(state, isBusy) {
    return (state.isBusy = isBusy);
  },
  setLoadingCreateRecord(state, payload) {
    const index = state.listPatientContent.findIndex(
      (item) => item.userName === payload.patient.userName
    );
    Object.assign(payload.patient, {
      isLoadingCreate: payload.isLoadingCreate,
    });
    if (index !== -1)
      state.listPatientContent.splice(index, 1, payload.patient);
  },
};

const actions = {
  getPatient({ commit }, state) {
    commit("setIsBusy", true);
    HTTP.post(
      "user/findByRoleAndIsDeleteFalse",
      {
        roleId: "4",
      },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((response) => {
        commit("setIsBusy", false);
        commit("setListPatient", response.data);
      })
      .catch((error) => {
        commit("setIsBusy", false);
      });
  },
};

export const patientContent = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
