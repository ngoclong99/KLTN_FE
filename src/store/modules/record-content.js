import Vue from "vue";
import { HTTP } from "../../services/services";
const doctorID = localStorage.getItem("username");

const state = {
  listRecordMe: [],
  listRecord: [],
  isBusy: false,
  isBusyDetails: false,
  isLoading: false,
  isModalCreate: false,
};

const getters = {
  listRecordMe: (state) => state.listRecordMe,
  listRecordMeImp: (state) => {
    const list = state.listRecordMe.filter((item) => {
      return item.severity === true;
    });
    return list;
  },
  listPrescriptionRecord: (state) => {
    return state.listRecord.filter((item) => {
      return item.detailMRs[0].prescriptions.length != 0;
    });
  },
  listRecordService: (state) => {
    return state.listRecord.filter((item) => {
      return item.detailMRs[0].detailServiceUsed.length > 0;
    });
  },
  listRecord: (state) => state.listRecord,
  isBusy: (state) => state.isBusy,
  isBusyDetails: (state) => state.isBusyDetails,
  isLoading: (state) => state.isLoading,
  isModalCreate: (state) => state.isModalCreate,
};

const mutations = {
  listRecordMe(state, data) {
    state.listRecordMe = data;
  },
  listRecord(state, data) {
    data.forEach((element) => {
      Object.assign(element, { _showDetails: false, isLoadingRecord: false });
    });
    state.listRecord = data;
  },
  addRecord(state, record) {
    Object.assign(record, { _showDetails: false, isLoadingRecord: false });
    state.listRecord.unshift(record);
  },
  setIsLoadingPrescription(state, payload) {
    const index = state.listRecord.findIndex(
      (item) => item.id === payload.prescription.id
    );
    Object.assign(payload.prescription, { isLoadingRecord: payload.isLoadingRecord });
    if (index !== -1) state.listRecord.splice(index, 1, payload.prescription);
  },

  setIsBusy(state, isbusy) {
    state.isBusy = isbusy;
  },
  setIsBusyDetails(state, isBusyDetails) {
    state.isBusyDetails = isBusyDetails;
  },
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
  setIsModalCreate(state, status) {
    state.isBusy = status;
  },
};

const actions = {
  getRecordMe({ commit }) {
    commit("setIsBusy", true);
    HTTP.get("medicalrecord/myRecord", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((response) => {
        commit("setIsBusy", false);
        commit("listRecordMe", response.data);
      })
      .catch((err) => {
        commit("setIsBusy", false);
      });
  },
  getListRecord({ commit }) {
    commit("setIsBusy", true);
    HTTP.get("medicalrecord/listMR", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((response) => {
        commit("setIsBusy", false);
        commit("listRecord", response.data);
      })
      .catch((err) => {
        commit("setIsBusy", false);
      });
  },
  getListRecordDetails({ commit }) {
    commit("setIsBusyDetails", true);
    HTTP.get("medicalrecord/listMR", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((response) => {
        commit("setIsBusyDetails", false);
        commit("listRecord", response.data);
        console.log(response.data);
      })
      .catch((err) => {
        commit("setIsBusyDetails", false);
      });
  },
  setRecord({ state, dispatch, commit }, data) {
    let router = data.router;
    HTTP.post(
      "medicalrecord/createMR",
      {
        address: data.detail.address,
        age: data.detail.age,
        dateOfReExamination: data.detail.dateOfReExamination,
        diagnostic: data.detail.diagnostic,
        doctorId: data.doctorID,
        height: data.detail.height,
        note: data.detail.note,
        patientId: data.detail.patientId,
        patientName: data.detail.patientName,
        phoneNumber: data.detail.phoneNumber,
        severity: data.detail.severity,
        title: data.detail.title,
        weight: data.detail.weight,
        yeaOfIllness: data.detail.yeaOfIllness,
      },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((response) => {
        commit(
          "patientContent/setLoadingCreateRecord",
          {
            isLoadingCreate: false,
            patient: data.patient,
          },
          { root: true }
        );
        alert("Create record success");
        commit("setIsLoading", true);
        commit("addRecord", response.data.medicalRecordEntity);
        Vue.nextTick(() => {
          commit("setIsLoading", false);
          router.push({ name: "TheRecord" });
        });
      })
      .catch((err) => {
        commit(
          "patientContent/setLoadingCreateRecord",
          {
            isLoadingCreate: false,
            patient: data.patient,
          },
          { root: true }
        );
        alert("Create record fail");
        commit("setIsLoading", true);
        Vue.nextTick(() => {
          commit("setIsLoading", false);
        });
      });
  },
};

export const recordContent = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
