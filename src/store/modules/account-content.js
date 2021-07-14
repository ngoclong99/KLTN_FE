import moment from "moment";
import { HTTP } from "../../services/services";

const state = {
  ListAccountDoctor: [],
  ListAccountStaff: [],
  ListAccountPatient: [],
  ListDoctorTrue: [],
  isBusy: false,
  isLoading: false,
  isLoadingCreateDoctor: false,
  isLoadingCreateStaff: false,
  isLoadingCreatePatient: false,
};

const getters = {
  ListAccountDoctor: (state) => state.ListAccountDoctor,
  ListAccountStaff: (state) => state.ListAccountStaff,
  ListAccountPatient: (state) => state.ListAccountPatient,
  ListDoctorTrue: (state) => state.ListDoctorTrue,
  isBusy: (state) => state.isBusy,
  isLoading: (state) => state.isLoading,
  isLoadingCreateDoctor: (state) => state.isLoadingCreateDoctor,
  isLoadingCreateStaff: (state) => state.isLoadingCreateDoctor,
  isLoadingCreatePatient: (state) => state.isLoadingCreateDoctor,
};

const mutations = {
  ListAccountDoctor(state, data) {
    data.forEach((element) => {
      Object.assign(element, { _showDetails: false });
    });
    state.ListAccountDoctor = data;
  },
  addDoctor(state, doctor) {
    Object.assign(doctor, { _showDetails: false });
    state.ListAccountDoctor.unshift(doctor);
  },
  ListAccountStaff(state, data) {
    data.forEach((element) => {
      Object.assign(element, { _showDetails: false });
    });
    state.ListAccountStaff = data;
  },
  addStaff(state, staff) {
    Object.assign(staff, { _showDetails: false });
    state.ListAccountStaff.unshift(staff);
  },
  ListAccountPatient(state, data) {
    data.forEach((element) => {
      Object.assign(element, { _showDetails: false });
    });
    state.ListAccountPatient = data;
  },
  addPatient(state, patient) {
    Object.assign(patient, { _showDetails: false });
    state.ListAccountPatient.unshift(patient);
  },
  ListAccountDoctorTrue(state, data) {
    state.ListDoctorTrue = data;
  },
  setIsBusy(state, isBusy) {
    state.isBusy = isBusy;
  },
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
  setIsLoadingCreateDoctor(state, isLoadingCreateDoctor) {
    state.isLoadingCreateDoctor = isLoadingCreateDoctor;
  },
  setIsLoadingCreateStaff(state, isLoadingCreateDoctor) {
    state.isLoadingCreateDoctor = isLoadingCreateDoctor;
  },
  setIsLoadingCreatePatient(state, isLoadingCreateDoctor) {
    state.isLoadingCreateDoctor = isLoadingCreateDoctor;
  },
};

const actions = {
  getListAccountDoctor({ commit }) {
    commit("setIsBusy", true);
    HTTP.post(
      "role/getListByRole",
      {
        roleName: "ROLE_DOCTOR",
      },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((rep) => {
        commit("setIsBusy", false);
        commit("ListAccountDoctor", rep.data.users);
      })
      .catch((err) => {
        commit("setIsBusy", false);
      });
  },
  getListAccountStaff({ commit }) {
    commit("setIsBusy", true);
    HTTP.post(
      "role/getListByRole",
      {
        roleName: "ROLE_STAFF",
      },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((rep) => {
        commit("setIsBusy", false);
        commit("ListAccountStaff", rep.data.users);
      })
      .catch((err) => {
        commit("setIsBusy", false);
      });
  },
  getListAccountDoctorTrue({ commit }) {
    HTTP.get("user/findAllDoctorAndIsDeleteFalse", {})
      .then((rep) => {
        commit("ListAccountDoctorTrue", rep.data);
      })
      .catch((err) => {});
  },
  getListAccountPatient({ commit }) {
    commit("setIsBusy", true);
    HTTP.post(
      "role/getListByRole",
      {
        roleName: "ROLE_PATIENT",
      },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((rep) => {
        commit("setIsBusy", false);
        commit("ListAccountPatient", rep.data.users);
      })
      .catch((err) => {
        commit("setIsBusy", false);
      });
  },
  setAccountDoctor({ commit, dispatch }, payload) {
    commit("setIsLoading", true);
    HTTP.put(
      "user/editDoctor",
      {
        status: payload.status,
        experience: payload.experience,
        specialized: payload.specialized,
        userDoctor: payload.userDoctor,
      },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((rep) => {
        commit("setIsLoading", false);
        dispatch("getListAccountDoctor");
      })
      .catch((err) => {
        commit("setIsLoading", false);
      });
  },
  setStatusAccount({ commit, dispatch }, id) {
    HTTP.put(
      `user/changeStatus/${id}`,
      {},
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((rep) => {
        alert(rep.data.message);
        dispatch("getListAccountPatient");
        dispatch("getListAccountStaff");
      })
      .catch((err) => {});
  },
  createAccountDoctor({ commit, dispatch }, payload) {
    HTTP.post(
      "auth/registerDoctor",
      {
        userName: payload.userName,
        password: payload.password,
        fullName: payload.fullName,
        phoneNumber: payload.phoneNumber,
        email: payload.email,
        gender: payload.gender,
        experience: payload.experience,
        specialized: payload.specialized,
        address: payload.address,
      },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((response) => {
        commit("setIsLoadingCreateDoctor", false);
        commit("addDoctor", response.data);
        alert("Create doctor success");
      })
      .catch((err) => {
        commit("setIsLoadingCreateDoctor", false);
        alert("Create doctor fail");
      });
  },
  createAccountStaff({ commit, dispatch }, payload) {
    commit("setIsLoading", true);
    HTTP.post(
      "auth/registerStaff",
      {
        userName: payload.userName,
        password: payload.password,
        fullName: payload.fullName,
        phoneNumber: payload.phoneNumber,
        email: payload.email,
        gender: payload.gender,
        address: payload.address,
      },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((response) => {
        commit("setIsLoadingCreateStaff", false);
        commit("addStaff", response.data);
        alert("Create staff success");
      })
      .catch((err) => {
        commit("setIsLoadingCreateStaff", false);
        alert("Create staff fail");
      });
  },
  createAccountPatient({ commit, dispatch }, payload) {
    commit("setIsLoading", true);
    HTTP.post(
      "auth/register",
      {
        userName: payload.userName,
        password: payload.password,
        fullName: payload.fullName,
        phoneNumber: payload.phoneNumber,
        email: payload.email,
        gender: payload.gender,
        address: payload.address,
      },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((response) => {
        commit("setIsLoadingCreatePatient", false);
        commit("addPatient", response.data);
        alert("Create patient success");
      })
      .catch((err) => {
        commit("setIsLoadingCreatePatient", false);
        alert("Create patient fail");
      });
  },
};

export const accountContent = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
